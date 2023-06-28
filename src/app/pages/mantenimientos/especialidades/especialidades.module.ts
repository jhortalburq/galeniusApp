import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadesRoutingModule } from './especialidades-routing.module';

import { EspecialidadesComponent } from './especialidades.component';

import { AddEspecialidadComponent } from './add-especialidad/add-especialidad.component';
import { EditEspecialidadComponent } from './edit-especialidad/edit-especialidad.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    EspecialidadesComponent,
    AddEspecialidadComponent,
    EditEspecialidadComponent
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    MaterialModule,
    SharedModule,
    Select2Module,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EspecialidadesModule { }
