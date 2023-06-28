import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisClinicosComponent } from './analisis-clinicos.component';

describe('AnalisisClinicosComponent', () => {
  let component: AnalisisClinicosComponent;
  let fixture: ComponentFixture<AnalisisClinicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalisisClinicosComponent]
    });
    fixture = TestBed.createComponent(AnalisisClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
