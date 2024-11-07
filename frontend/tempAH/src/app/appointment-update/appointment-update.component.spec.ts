import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentUpdateComponent } from './appointment-update.component';

describe('AppointmentUpdateComponent', () => {
  let component: AppointmentUpdateComponent;
  let fixture: ComponentFixture<AppointmentUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentUpdateComponent]
    });
    fixture = TestBed.createComponent(AppointmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
