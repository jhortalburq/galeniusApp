import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { PageRoutingModule } from './ocupacional-routing.module'

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class OcupacionalModule { }
