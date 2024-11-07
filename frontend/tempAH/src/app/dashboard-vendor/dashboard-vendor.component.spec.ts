import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVendorComponent } from './dashboard-vendor.component';

describe('DashboardVendorComponent', () => {
  let component: DashboardVendorComponent;
  let fixture: ComponentFixture<DashboardVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardVendorComponent]
    });
    fixture = TestBed.createComponent(DashboardVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
