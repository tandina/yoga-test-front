import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { expect } from "@jest/globals";
import { SessionService } from "src/app/services/session.service";
import { SessionApiService } from "../../services/session-api.service";
import { TeacherService } from "../../../../services/teacher.service";
import { of } from "rxjs";
import { FormComponent } from "./form.component";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
    },
  };

  const mockSessionApiService = {
    create: jest.fn().mockReturnValue(of({})),
    update: jest.fn().mockReturnValue(of({})),
    detail: jest.fn().mockReturnValue(of({})),
  };
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue("1"),
      },
    },
  };
  const mockTeacherService = {
    all: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: TeacherService, useValue: mockTeacherService },
      ],
      declarations: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should initialize form", () => {
    expect(component.sessionForm).toBeDefined();
    expect(component.sessionForm?.valid).toBeFalsy();
  });

  it("form should be invalid", () => {
    expect(component.sessionForm?.valid).toBeFalsy();
  });

  it("name field validity", () => {
    let name = component.sessionForm?.controls["name"];
    expect(name?.valid).toBeFalsy();
    name?.setValue("123");
    expect(name?.hasError("name")).toBeTruthy();
    name?.setValue("victor");
    expect(name?.valid).toBeTruthy();
  });

  it("should validate form on submit", () => {
    component.sessionForm?.setValue({
      name: "Test Session",
      date: "2022-01-01",
      teacher_id: "1",
      description: "This is a test session",
    });
    component.submit();
    expect(component.sessionForm?.valid).toBeTruthy();
    if (component.onUpdate) {
      expect(mockSessionApiService.update).toHaveBeenCalled();
    } else {
      expect(mockSessionApiService.create).toHaveBeenCalled();
    }
  });
  it("should display error when name is missing", () => {
    component.sessionForm?.get("name")?.setValue("");
    component.submit();
    expect(component.sessionForm?.get("name")?.invalid).toBeTruthy();
    expect(
      component.sessionForm?.get("name")?.errors?.["required"]
    ).toBeTruthy();
  });

  it("should update form on submit", () => {
    component.sessionForm?.setValue({
      name: "Test Session",
      date: "2022-01-01",
      teacher_id: "1",
      description: "This is a test session",
    });
    component.submit();
    component.onUpdate = true;
    component.sessionForm?.setValue({
      name: "Updated Session",
      date: "2022-02-02",
      teacher_id: "2",
      description: "This is an updated session",
    });
    component.submit();
    expect(component.sessionForm?.valid).toBeTruthy();
    if (component.onUpdate) {
      expect(mockSessionApiService.update).toHaveBeenCalled();
    }
  });

  it("should not update session on submit if name is empty", () => {
    component.onUpdate = true;
    component.ngOnInit();
    component.sessionForm?.setValue({
      name: "",
      date: "2022-02-02",
      teacher_id: "2",
      description: "This is an updated session",
    });

    component.submit();

    expect(component.sessionForm?.valid).toBeFalsy();
    expect(mockSessionApiService.update).toHaveBeenCalled();
  });
});
