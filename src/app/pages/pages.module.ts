import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PageRoutingModule } from './pages-routing.module';

import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';

import { MDBBootstrapModulesPro } from '../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    PagesComponent,
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
