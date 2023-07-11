import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../../shared/shared.module';
import { ExamenesModule } from '../examenes.module';
import { OsteomuscularRoutingModule } from './osteomuscular-routing.module'

import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { DetalleComponent } from './detalle/detalle.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { ExploracionComponent } from './exploracion/exploracion.component';



@NgModule({
  declarations: [
    ListaExamenesComponent,
    DetalleComponent,
    CuestionarioComponent,
    EvaluacionComponent,
    ExploracionComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    Select2Module,
    SharedModule,
    ExamenesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OsteomuscularRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OsteomuscularModule { }
