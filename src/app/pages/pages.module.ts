import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PageRoutingModule } from './pages-routing.module';

import { SharedModule } from '../shared/shared.module';

import { MDBBootstrapModulesPro } from '../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import { SeleccionarModuloComponent } from './seleccionar-modulo/seleccionar-modulo.component';
import { SeleccionarSucursalComponent } from './seleccionar-sucursal/seleccionar-sucursal.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    PagesComponent,
    SeleccionarModuloComponent,
    SeleccionarSucursalComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    SharedModule,
    FullCalendarModule,
    PageRoutingModule,
  ]
})
export class PagesModule { }
