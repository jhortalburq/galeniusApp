import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposCitasComponent } from './tipos-citas/tipos-citas.component';

import { TiposCitasRoutingModule } from './tipos-citas-routing.module';

@NgModule({
  declarations: [
    TiposCitasComponent
  ],
  imports: [
    CommonModule,
    TiposCitasRoutingModule
  ]
})
export class TiposCitasModule { }
