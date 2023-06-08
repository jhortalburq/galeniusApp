import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioComponent } from './inventario.component';
import { MenuComponent } from './menu/menu.component';

import { PageRoutingModule } from './inventario-routing.module';


@NgModule({
  declarations: [
    InventarioComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class InventarioModule { }
