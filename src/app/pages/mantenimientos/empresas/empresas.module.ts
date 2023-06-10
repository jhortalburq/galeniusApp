import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { EmpresaRoutingModule } from './empresas.routing';

import {
  ListaEmpresasComponent,
  AgregarEmpresaComponent,
  EditarEmpresaComponent,
  DetalleEmpresaComponent,
  UsuariosEmpresaComponent,
  LogoEmpresaComponent
} from './empresas.index';


@NgModule({
  declarations: [
    ListaEmpresasComponent,
    AgregarEmpresaComponent,
    EditarEmpresaComponent,
    DetalleEmpresaComponent,
    UsuariosEmpresaComponent,
    LogoEmpresaComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    EmpresaRoutingModule
  ],
  // entryComponents: [ AgregarEmpresaComponent, EditarEmpresaComponent]
})
export class EmpresasModule { }
