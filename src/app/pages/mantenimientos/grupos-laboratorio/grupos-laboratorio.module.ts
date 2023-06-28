import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoLaboratorioComponent } from './grupo-laboratorio/grupo-laboratorio.component';

import { GrupoLaboratorioRoutingModule } from './grupos-laboratorio-routing.module';

@NgModule({
  declarations: [
    GrupoLaboratorioComponent
  ],
  imports: [
    CommonModule,
    GrupoLaboratorioRoutingModule
  ]
})
export class GruposLaboratorioModule { }
