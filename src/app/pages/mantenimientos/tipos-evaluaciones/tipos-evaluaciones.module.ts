import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposEvaluacionesComponent } from './tipos-evaluaciones/tipos-evaluaciones.component';

import { TiposEvaluacionesRoutingModule } from './tipos-evaluaciones-routing.module';

@NgModule({
  declarations: [
    TiposEvaluacionesComponent
  ],
  imports: [
    CommonModule,
    TiposEvaluacionesRoutingModule
  ]
})
export class TiposEvaluacionesModule { }
