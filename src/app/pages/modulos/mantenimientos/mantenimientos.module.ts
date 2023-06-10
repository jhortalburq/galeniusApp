import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './mantenimientos-routing.module';

import { MantenimientosComponent } from './mantenimientos.component'
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    MantenimientosComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class MantenimientosModule { }
