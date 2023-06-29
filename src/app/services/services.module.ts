import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


import {
  BreadcrumbsService,
  SidebarService,
  AuthService,
  AuthInterceptor,
  EmpresaService,
  SharedService
} from './services.index';


@NgModule({
  providers: [
    BreadcrumbsService,
    SidebarService,
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
    HttpClientModule,
    RouterModule
  ],
  declarations: []
})
export class ServicesModule { }
