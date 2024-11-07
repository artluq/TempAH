import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frontpage2Component } from './frontpage2.component';

describe('Frontpage2Component', () => {
  let component: Frontpage2Component;
  let fixture: ComponentFixture<Frontpage2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Frontpage2Component]
    });
    fixture = TestBed.createComponent(Frontpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
