import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCollabAddComponent } from './corporate-collab-add.component';

describe('CorporateCollabAddComponent', () => {
  let component: CorporateCollabAddComponent;
  let fixture: ComponentFixture<CorporateCollabAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateCollabAddComponent]
    });
    fixture = TestBed.createComponent(CorporateCollabAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
