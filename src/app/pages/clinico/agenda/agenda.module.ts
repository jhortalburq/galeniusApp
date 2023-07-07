import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';
import { AgendaEspecialistaComponent } from './agenda-especialista/agenda-especialista.component';

import { AgendaRoutingModule } from './agenda-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';

import { HorariosModule } from '../horarios/horarios.module';

@NgModule({
  declarations: [
    AgendaDiariaComponent,
    AgendaEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AgendaRoutingModule,
    HorariosModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AgendaModule { }