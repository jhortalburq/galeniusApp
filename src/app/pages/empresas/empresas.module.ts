import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../shared/shared.module';

import { EmpresaRoutingModule } from './empresas.routing';

import {
  ListaEmpresasComponent,
  AgregarEmpresaComponent,
  EditarEmpresaComponent,
  UsuariosEmpresaComponent,
  DatosEmpresaComponent,
} from './empresas.index';


@NgModule({
  declarations: [
    ListaEmpresasComponent,
    AgregarEmpresaComponent,
    EditarEmpresaComponent,
    UsuariosEmpresaComponent,
    DatosEmpresaComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EmpresaRoutingModule
  ],
  // entryComponents: [ AgregarEmpresaComponent, EditarEmpresaComponent]
})
export class EmpresasModule { }
