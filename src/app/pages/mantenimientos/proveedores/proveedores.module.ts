import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';

import { ProveedorRoutingModule } from './proveedores.routing';


@NgModule({
  declarations: [ListaProveedoresComponent, AgregarProveedorComponent, EditarProveedorComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ProveedorRoutingModule
  ],
  // entryComponents: [ AgregarProveedorComponent, EditarProveedorComponent]

})
export class ProveedoresModule { }
