import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';
import { NuevoIngresoComponent } from './nuevo-ingreso/nuevo-ingreso.component';

import { AgendaRoutingModule } from './agenda-routing.module';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';

import { Select2Module } from 'ng-select2-component';
import { IngresarPagoComponent } from './ingresar-pago/ingresar-pago.component';
import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';

@NgModule({
  declarations: [
    AgendaDiariaComponent,
    NuevoIngresoComponent,
    IngresarPagoComponent,
    CitasProgramadasComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgendaRoutingModule,
    SharedModule,
    Select2Module,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AgendaModule { }
