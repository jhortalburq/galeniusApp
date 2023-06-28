import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenesLaboratorioComponent } from './examenes-laboratorio/examenes-laboratorio.component';

import { ExamenesLaboratorioRoutingModule } from './examenes-laboratorio-routing.module';


@NgModule({
  declarations: [
    ExamenesLaboratorioComponent
  ],
  imports: [
    CommonModule,
    ExamenesLaboratorioRoutingModule
  ]
})
export class ExamenesLaboratorioModule { }
