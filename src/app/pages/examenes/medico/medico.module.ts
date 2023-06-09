import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../../shared/shared.module';
import { ExamenesModule } from '../examenes.module';
import { ExamenMedicoRoutingModule } from './medico-routing.module';

import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { DetalleComponent } from './detalle/detalle.component';
import { InterconsultasComponent } from './interconsultas/interconsultas.component';
import { ExamenesComplementariosComponent } from './examenes-complementarios/examenes-complementarios.component';
import { FiliacionFichaComponent } from './filiacion-ficha/filiacion-ficha.component';
import { LaboralFichaComponent } from './laboral-ficha/laboral-ficha.component';
import { DatosBiometricosOrdenComponent } from './filiacion-ficha/datos-biometricos-orden/datos-biometricos-orden.component';
import { DatosPersonalesOrdenComponent } from './filiacion-ficha//datos-personales-orden/datos-personales-orden.component';
import { AntecedentesLaboralesComponent } from './antecedentes/antecedentes-laborales/antecedentes-laborales.component';
import { AntecedentesPersonalesComponent } from './antecedentes/antecedentes-personales/antecedentes-personales.component';
import { AntecedentesFamiliaresComponent } from './antecedentes/antecedentes-familiares/antecedentes-familiares.component';
import { AbsentismosLaboralesComponent } from './antecedentes/absentismos-laborales/absentismos-laborales.component';
import { HabitosNocivosComponent } from './antecedentes/habitos-nocivos/habitos-nocivos.component';

@NgModule({
  declarations: [
    ListaExamenesComponent,
    EvaluacionComponent,
    AntecedentesComponent,
    DetalleComponent,
    InterconsultasComponent,
    ExamenesComplementariosComponent,
    FiliacionFichaComponent,
    LaboralFichaComponent,
    DatosBiometricosOrdenComponent,
    DatosPersonalesOrdenComponent,
    AntecedentesLaboralesComponent,
    AntecedentesPersonalesComponent,
    AntecedentesFamiliaresComponent,
    AbsentismosLaboralesComponent,
    HabitosNocivosComponent,

  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    ExamenesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ExamenMedicoRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MedicoModule { }
