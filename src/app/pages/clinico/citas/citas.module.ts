import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CitasRoutingModule } from './citas-routing.module';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../../shared/shared.module';

import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';


@NgModule({
  declarations: [
    CitasProgramadasComponent,
    NuevaCitaComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    SharedModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    CitasRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CitasModule { }
