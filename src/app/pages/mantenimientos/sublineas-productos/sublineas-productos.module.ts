import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubLineasProductoRoutingModule } from './sublineas-productos.routing';

import { ListaSublineasComponent } from './lista-sublineas/lista-sublineas.component';
import { AgregarSublineasComponent } from './agregar-sublineas/agregar-sublineas.component';
import { EditarSublineasComponent } from './editar-sublineas/editar-sublineas.component';


@NgModule({
  declarations: [ListaSublineasComponent, AgregarSublineasComponent, EditarSublineasComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SubLineasProductoRoutingModule],
    // entryComponents: [AgregarSublineasComponent, EditarSublineasComponent]  
})
export class SublineasProductosModule { }
