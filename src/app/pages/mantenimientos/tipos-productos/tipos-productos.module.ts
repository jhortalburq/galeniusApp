import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaTipoProductoComponent } from './lista-tipo-producto/lista-tipo-producto.component';
import { AgregarTipoProductoComponent } from './agregar-tipo-producto/agregar-tipo-producto.component';
import { EditarTipoProductoComponent } from './editar-tipo-producto/editar-tipo-producto.component';

import { TiposProductosRoutingModule } from './tipos-productos.routing';

@NgModule({
  declarations: [ListaTipoProductoComponent, AgregarTipoProductoComponent, EditarTipoProductoComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TiposProductosRoutingModule
  ],
  exports: [AgregarTipoProductoComponent, EditarTipoProductoComponent]
})
export class TiposProductosModule { }
