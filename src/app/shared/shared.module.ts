import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavigationComponent } from './navigation/navigation.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { MDBBootstrapModulesPro } from '../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { Select2Module } from 'ng-select2-component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { ModulosComponent } from './modulos/modulos.component';

import { CheckboxModulosComponent } from './components/checkbox-modulos/checkbox-modulos.component';
import { CheckboxItemComponent } from './components/checkbox-item/checkbox-item.component'

import { FiltrosPacientesComponent } from './filtros/filtros-pacientes/filtros-pacientes.component';
import { CitasFiltroComponent } from './filtros/citas-filtro/citas-filtro.component';
import { FiltroEspecialistaComponent } from './filtros/filtro-especialista/filtro-especialista.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UbigeoComponent } from './components/ubigeo/ubigeo.component';
import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';

@NgModule({
  declarations: [
    NavigationComponent,
    BreadcrumbsComponent,
    ModulosComponent,
    FiltroEspecialistaComponent,
    CitasFiltroComponent,
    FiltrosPacientesComponent,
    CheckboxModulosComponent,
    PaginationComponent,
    CheckboxItemComponent,
    UbigeoComponent,
    CalendarEventsComponent,
  ],
  exports: [
    NavigationComponent,
    BreadcrumbsComponent,
    ModulosComponent,
    RouterModule,
    FiltroEspecialistaComponent,
    CitasFiltroComponent,
    FiltrosPacientesComponent,
    CheckboxModulosComponent,
    CheckboxItemComponent,
    PaginationComponent,
    UbigeoComponent,
    CalendarEventsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModulesPro.forRoot(),
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
