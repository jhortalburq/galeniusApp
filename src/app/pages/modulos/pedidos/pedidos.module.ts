import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { MenuComponent } from './menu/menu.component';

import { PageRoutingModule } from './pedidos-routing.module';


@NgModule({
  declarations: [
    PedidosComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PedidosModule { }
