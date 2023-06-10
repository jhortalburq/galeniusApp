import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';
import { EditarMarcaComponent } from './editar-marca/editar-marca.component';
import { ListaMarcaComponent } from './lista-marca/lista-marca.component';

import { MarcasRoutingModule } from './marca.routing';

@NgModule({
  declarations: [AgregarMarcaComponent, EditarMarcaComponent, ListaMarcaComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MarcasRoutingModule
  ],
  // entryComponents: [AgregarMarcaComponent, EditarMarcaComponent],
})
export class MarcaModule { }
