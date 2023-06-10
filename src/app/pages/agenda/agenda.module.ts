import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';

import { AgendaRoutingModule } from './agenda-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    AgendaDiariaComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AgendaRoutingModule
  ]
})
export class AgendaModule { }
