import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { SharedModule } from '../../../shared/shared.module';

import { SucursalesRoutingModule } from './sucursales.routing';

import {
  ListaSucursalesComponent,
  AgregarSucursalComponent,
  DetalleSucursalComponent,
  EditarSucursalComponent
}
from './sucursales.index';
import { UsuariosSucursalComponent } from './usuarios-sucursal/usuarios-sucursal.component';


@NgModule({
  declarations: [
      ListaSucursalesComponent,
      AgregarSucursalComponent,
      EditarSucursalComponent,
      DetalleSucursalComponent,
      UsuariosSucursalComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SucursalesRoutingModule,
    SharedModule
  ],
  // entryComponents: [ AgregarSucursalComponent, EditarSucursalComponent, DetalleSucursalComponent]
})
export class SucursalesModule { }
