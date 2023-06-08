import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ComercialComponent } from './comercial.component';

import { PageRoutingModule } from './comercial-routing.module';


@NgModule({
  declarations: [
    ComercialComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class ComercialModule { }
