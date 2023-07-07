import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AtencionesDiariasComponent } from './atenciones-diarias/atenciones-diarias.component';
import { AgregarAtencionComponent } from './agregar-atencion/agregar-atencion.component';
import { EditarAtencionComponent } from './editar-atencion/editar-atencion.component';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../../shared/shared.module';

import { AtencionesRoutingModule } from './atenciones-routing.module';

@NgModule({
  declarations: [
    AtencionesDiariasComponent,
    AgregarAtencionComponent,
    EditarAtencionComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AtencionesRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AtencionesModule { }
