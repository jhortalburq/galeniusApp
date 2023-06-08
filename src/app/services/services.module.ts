import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotificationsService } from './notifications.service';

import {
  BreadcrumbsService,
  PosService,
  InventarioService,
  SidebarService,
  AdministradorService,
  ComercialService,
  AuthService,
  AuthInterceptor,
  EmpresaService,
  SharedService
} from './services.index';


@NgModule({
  providers: [
    BreadcrumbsService,
    PosService,
    SidebarService,
    InventarioService,
    AdministradorService,
    ComercialService,
    AuthService,
    EmpresaService,
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: []
})
export class ServicesModule { }
