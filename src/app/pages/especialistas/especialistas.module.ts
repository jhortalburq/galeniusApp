import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { NuevoEspecialistaComponent } from './nuevo-especialista/nuevo-especialista.component';
import { EditarEspecialistaComponent } from './editar-especialista/editar-especialista.component';
import { DetalleEspecialistaComponent } from './detalle-especialista/detalle-especialista.component';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';

import { EspecialistasRoutingModule } from './especialistas-routing.module';
import { FiltroEspecialistaComponent } from './filtro-especialista/filtro-especialista.component';

@NgModule({
  declarations: [
    ListaEspecialistasComponent,
    NuevoEspecialistaComponent,
    EditarEspecialistaComponent,
    DetalleEspecialistaComponent,
    FiltroEspecialistaComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EspecialistasRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EspecialistasModule { }
