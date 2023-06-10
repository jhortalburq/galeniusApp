import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CitasRoutingModule } from './citas-routing.module';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';

import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';
import { CitasFiltroComponent } from './citas-filtro/citas-filtro.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';


@NgModule({
  declarations: [
    CitasProgramadasComponent,
    CitasFiltroComponent,
    NuevaCitaComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    CitasRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [CitasFiltroComponent]
})
export class CitasModule { }
