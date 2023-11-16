import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SessionService } from "src/app/services/session.service";
import { expect } from "@jest/globals";
import { By } from "@angular/platform-browser";

import { MeComponent } from "./me.component";

describe("MeComponent", () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1,
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not show delete button for non-admin user", () => {
    mockSessionService.sessionInformation.admin = false;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(
      By.css("mat-raised-button")
    );
    expect(deleteButton).toBeNull();
  });
  it("should show user information when user is defined", () => {
    component.user = {
      id: 1,
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "user",
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fixture.detectChanges();
    const userInfo = fixture.debugElement.query(By.css("mat-card-content"));
    expect(userInfo).toBeTruthy();
  });

  it("should show admin message for admin user", () => {
    component.user = {
      id: 1,
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "admin",
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fixture.detectChanges();
    const adminMessage = fixture.debugElement.query(By.css(".my2"));
    expect(adminMessage).toBeTruthy();
  });
});
