import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableroGeneralComponent } from './tablero-general/tablero-general.component';
import { IngresarHorarioComponent } from './ingresar-horario/ingresar-horario.component';
import { HorarioDetalleComponent } from './horario-detalle/horario-detalle.component';

import { HorariosRoutingModule } from './horararios-routing.module';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { Select2Module } from 'ng-select2-component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    TableroGeneralComponent,
    IngresarHorarioComponent,
    HorarioDetalleComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FullCalendarModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    HorariosRoutingModule
  ]
})
export class HorariosModule { }
