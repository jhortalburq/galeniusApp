import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './mantenimientos-routing.module';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class MantenimientosModule { }
