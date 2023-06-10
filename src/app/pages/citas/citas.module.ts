import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CitasRoutingModule } from './citas-routing.module';
import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';

import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';
import { CitasFiltroComponent } from './citas-filtro/citas-filtro.component';


@NgModule({
  declarations: [
    CitasProgramadasComponent,
    CitasFiltroComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
