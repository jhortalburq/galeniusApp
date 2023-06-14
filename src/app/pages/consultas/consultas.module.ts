import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../shared/shared.module';

import { ListaConsultasComponent } from './lista-consultas/lista-consultas.component';

import { ConsultasRoutingModule } from './consultas-routing.module';

@NgModule({
  declarations: [
    ListaConsultasComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    Select2Module,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultasRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ConsultasModule { }
