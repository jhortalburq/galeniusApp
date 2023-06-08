import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { AlmacenRoutingModule } from './almacen.routing';

import { AgregarAlmacenComponent, 
         EditarAlmacenComponent, 
         ListaAlmacenesComponent, 
         DetalleAlmacenComponent,
         MovimientosAlmacenComponent,
         PermisosAlmacenComponent,
         EmpresasAlmacenComponent
      }  from './almacen.index';


@NgModule({
  declarations: [
    DetalleAlmacenComponent, 
    AgregarAlmacenComponent, 
    ListaAlmacenesComponent, 
    EditarAlmacenComponent,
    PermisosAlmacenComponent, 
    MovimientosAlmacenComponent, 
    EmpresasAlmacenComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AlmacenRoutingModule
  ],
  entryComponents: [AgregarAlmacenComponent, EditarAlmacenComponent]
})
export class AlmacenModule { }
