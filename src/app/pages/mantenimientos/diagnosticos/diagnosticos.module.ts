import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';

import { DiagnosticosRoutingModule } from './diagnosticos-routing.module';


@NgModule({
  declarations: [
    DiagnosticosComponent
  ],
  imports: [
    CommonModule,
    DiagnosticosRoutingModule
  ]
})
export class DiagnosticosModule { }
