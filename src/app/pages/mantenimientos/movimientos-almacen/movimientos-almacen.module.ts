import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';


import { MovimientosListaComponent } from './movimientos-lista/movimientos-lista.component';
import { AgregarMovimientoComponent } from './agregar-movimiento/agregar-movimiento.component';
import { EditarMovimientoComponent } from './editar-movimiento/editar-movimiento.component';

import { MovimientosAlmacenRoutingModule } from './movimientos-almacen.routing';



@NgModule({
  declarations: [MovimientosListaComponent, AgregarMovimientoComponent, EditarMovimientoComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MovimientosAlmacenRoutingModule
  ],
  entryComponents: [AgregarMovimientoComponent, EditarMovimientoComponent]
})
export class MovimientosAlmacenModule { }
