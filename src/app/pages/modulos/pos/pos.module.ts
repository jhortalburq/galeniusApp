import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosComponent } from './pos.component';
import { MenuComponent } from './menu/menu.component';

import { PageRoutingModule } from './pos-routing.module';



@NgModule({
  declarations: [
    PosComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PosModule { }
