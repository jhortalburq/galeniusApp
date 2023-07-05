import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaProtocolosComponent } from './lista-protocolos/lista-protocolos.component';
import { NuevoProtocoloComponent } from './nuevo-protocolo/nuevo-protocolo.component';
import { EditarProtocoloComponent } from './editar-protocolo/editar-protocolo.component';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../shared/shared.module';

import { ProtocolosRoutingModule } from './protocolos-routing.module'


@NgModule({
  declarations: [
    ListaProtocolosComponent,
    NuevoProtocoloComponent,
    EditarProtocoloComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProtocolosRoutingModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProtocolosModule { }
