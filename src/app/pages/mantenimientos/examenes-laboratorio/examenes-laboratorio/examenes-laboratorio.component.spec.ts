import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesLaboratorioComponent } from './examenes-laboratorio.component';

describe('ExamenesLaboratorioComponent', () => {
  let component: ExamenesLaboratorioComponent;
  let fixture: ComponentFixture<ExamenesLaboratorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenesLaboratorioComponent]
    });
    fixture = TestBed.createComponent(ExamenesLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
