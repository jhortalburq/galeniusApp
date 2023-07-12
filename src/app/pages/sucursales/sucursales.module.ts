import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';

import { SucursalesRoutingModule } from './sucursales.routing';

import {
  ListaSucursalesComponent,
  AgregarSucursalComponent,
  DetalleSucursalComponent,
  EditarSucursalComponent,
  LogoSucursalComponent,
  TurnosAtencionComponent,
  FormatoPDFComponent
}
from './sucursales.index';


@NgModule({
  declarations: [
      ListaSucursalesComponent,
      AgregarSucursalComponent,
      EditarSucursalComponent,
      DetalleSucursalComponent,
      LogoSucursalComponent,
      TurnosAtencionComponent,
      FormatoPDFComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SucursalesRoutingModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SucursalesModule { }
