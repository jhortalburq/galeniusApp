import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';
 
@NgModule({
  declarations: [
    MedicamentosComponent
  ],
  imports: [
    CommonModule,
    MedicamentosRoutingModule
  ]
})
export class MedicamentosModule { }
