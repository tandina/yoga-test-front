import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { expect } from "@jest/globals";
import { SessionService } from "src/app/services/session.service";
import { By } from "@angular/platform-browser";

import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show create button for admin user", () => {
    mockSessionService.sessionInformation.admin = true;
    fixture.detectChanges();
    const createButton = fixture.debugElement.query(
      By.css('button[routerLink="create"]')
    );
    expect(createButton).toBeTruthy();
  });

  it("should not show detail button for non-admin user", () => {
    mockSessionService.sessionInformation.admin = false;
    fixture.detectChanges();
    const detailButton = fixture.debugElement.query(
      By.css('button[routerLink="detail"]')
    );
    expect(detailButton).toBeNull();
  });

  it("should not show edit button for user", () => {
    mockSessionService.sessionInformation.admin = false;
    fixture.detectChanges();
    const editButton = fixture.debugElement.query(
      By.css('button[routerLink="edit"]')
    );
    expect(editButton).toBeNull();
  });
});
