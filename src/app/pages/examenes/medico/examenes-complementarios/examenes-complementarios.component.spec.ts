import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesComplementariosComponent } from './examenes-complementarios.component';

describe('ExamenesComplementariosComponent', () => {
  let component: ExamenesComplementariosComponent;
  let fixture: ComponentFixture<ExamenesComplementariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenesComplementariosComponent]
    });
    fixture = TestBed.createComponent(ExamenesComplementariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
