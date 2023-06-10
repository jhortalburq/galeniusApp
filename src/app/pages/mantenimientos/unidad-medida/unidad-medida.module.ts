import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaUnidadesComponent } from './lista-unidades/lista-unidades.component';
import { AgregarUnidadComponent } from './agregar-unidad/agregar-unidad.component';
import { EditarUnidadComponent } from './editar-unidad/editar-unidad.component';

import { UnidadMedidaRoutingModule } from './unidad-medida.routing';


@NgModule({
  declarations: [ListaUnidadesComponent, AgregarUnidadComponent, EditarUnidadComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    UnidadMedidaRoutingModule],
    // entryComponents: [AgregarUnidadComponent, EditarUnidadComponent]  
})
export class UnidadMedidaModule { }
