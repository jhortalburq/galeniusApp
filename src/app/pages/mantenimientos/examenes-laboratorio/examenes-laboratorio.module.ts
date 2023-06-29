import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenesLaboratorioComponent } from './examenes-laboratorio/examenes-laboratorio.component';

import { ExamenesLaboratorioRoutingModule } from './examenes-laboratorio-routing.module';

import { AddExamenLaboratorioComponent } from './add-examen-laboratorio/add-examen-laboratorio.component';
import { EditExamenLaboratorioComponent } from './edit-examen-laboratorio/edit-examen-laboratorio.component';
import { DetailExamenLaboratorioComponent } from './detail-examen-laboratorio/detail-examen-laboratorio.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
import { NuevoGrupoComponent } from './nuevo-grupo/nuevo-grupo.component';
import { EditGrupoComponent } from './edit-grupo/edit-grupo.component';

@NgModule({
  declarations: [
    ExamenesLaboratorioComponent,
    AddExamenLaboratorioComponent,
    EditExamenLaboratorioComponent,
    DetailExamenLaboratorioComponent,
    NuevoGrupoComponent,
    EditGrupoComponent
  ],
  imports: [
    CommonModule,
    ExamenesLaboratorioRoutingModule,
    MaterialModule,
    SharedModule,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamenesLaboratorioModule { }
