import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicacionesMedicasComponent } from './indicaciones-medicas/indicaciones-medicas.component';
import { IndicacionesMedicasRoutingModule } from './indicaciones-medicas-routing.module';

@NgModule({
  declarations: [
    IndicacionesMedicasComponent
  ],
  imports: [
    CommonModule,
    IndicacionesMedicasRoutingModule
  ]
})
export class IndicacionesMedicasModule { }
