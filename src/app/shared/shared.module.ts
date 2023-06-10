import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { MDBBootstrapModulesPro } from '../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { ModulosComponent } from '../modals/modulos/modulos.component';

@NgModule({
  declarations: [
    NavigationComponent,
    BreadcrumbsComponent,
    ModulosComponent
  ],
  exports: [
    NavigationComponent,
    BreadcrumbsComponent,
    ModulosComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  // entryComponents: [ ModulosComponent ]
})
export class SharedModule { }
