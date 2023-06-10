import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { AgregarLineasComponent } from './agregar-lineas/agregar-lineas.component';
import { EditarLineasComponent } from './editar-lineas/editar-lineas.component';
import { ListaLineasComponent } from './lista-lineas/lista-lineas.component';

import { LineasProductoRoutingModule } from './lineas-productos.routing';


@NgModule({
  declarations: [ListaLineasComponent, AgregarLineasComponent, EditarLineasComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LineasProductoRoutingModule
  ],
  // entryComponents: [AgregarLineasComponent, EditarLineasComponent]
})
export class LineasProductosModule { }
