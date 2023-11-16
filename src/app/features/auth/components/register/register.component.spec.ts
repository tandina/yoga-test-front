import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { expect } from "@jest/globals";
import { of, throwError } from "rxjs";

import { RegisterComponent } from "./register.component";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;
  let routerMock: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceMock = {
      register: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn(),
    };
    component = new RegisterComponent(
      authServiceMock,
      new FormBuilder(),
      routerMock
    );
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should register a user", () => {
    const registerSpy = authServiceMock.register.mockReturnValue(of(null));
    const navigateSpy = routerMock.navigate.mockReturnValue(
      Promise.resolve(true)
    );
    component.form.setValue({
      email: "test@test.com",
      firstName: "Test",
      lastName: "User",
      password: "password",
    });
    component.submit();
    expect(registerSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(["/login"]);
  });

  it("should handle registration error", () => {
    authServiceMock.register.mockReturnValue(
      throwError(() => new Error("error"))
    );
    component.submit();
    expect(component.onError).toBe(true);
  });
});
