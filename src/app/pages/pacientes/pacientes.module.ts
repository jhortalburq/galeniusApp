import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { DetallePacienteComponent } from './detalle-paciente/detalle-paciente.component';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../shared/shared.module';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { DatosLaboralesComponent } from './datos-laborales/datos-laborales.component';
import { DatosBiometricosComponent } from './datos-biometricos/datos-biometricos.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';


@NgModule({
  declarations: [
    ListaPacientesComponent,
    NuevoPacienteComponent,
    EditarPacienteComponent,
    DetallePacienteComponent,
    DatosPersonalesComponent,
    DatosLaboralesComponent,
    DatosBiometricosComponent,
    ConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PacientesRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PacientesModule { }
