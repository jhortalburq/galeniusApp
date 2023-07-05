import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IngresarHorarioComponent } from './ingresar-horario/ingresar-horario.component';
import { HorarioDetalleComponent } from './horario-detalle/horario-detalle.component';

import { HorariosRoutingModule } from './horararios-routing.module';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HorariosComponent } from './horarios/horarios.component';


@NgModule({
  declarations: [
    IngresarHorarioComponent,
    HorarioDetalleComponent,
    HorariosComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HorariosRoutingModule
  ],
  exports: [
    HorarioDetalleComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HorariosModule { }
