import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AdministradorComponent } from './administrador.component';

import { PageRoutingModule } from './administrador-routing.module';


@NgModule({
  declarations: [
    MenuComponent,
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class AdministradorModule { }
