import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { OrganizacionesRoutingModule } from './organizaciones-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { OrganizacionesComponent } from './organizaciones.component';
import { AgregarOrganizacionComponent } from './agregar-organizacion/agregar-organizacion.component';
import { DetalleOrganizacionComponent } from './detalle-organizacion/detalle-organizacion.component';


@NgModule({
  declarations: [
    OrganizacionesComponent,
    AgregarOrganizacionComponent,
    DetalleOrganizacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    OrganizacionesRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OrganizacionesModule { }
