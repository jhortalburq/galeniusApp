import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisClinicosComponent } from './analisis-clinicos/analisis-clinicos.component';

import { AnalisisClinicosRoutingModule } from './analisis-clinicos-routing.module';

@NgModule({
  declarations: [
    AnalisisClinicosComponent
  ],
  imports: [
    CommonModule,
    AnalisisClinicosRoutingModule
  ]
})
export class AnalisisClinicosModule { }
