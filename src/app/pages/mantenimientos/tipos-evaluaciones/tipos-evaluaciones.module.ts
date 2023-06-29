import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposEvaluacionesComponent } from './tipos-evaluaciones/tipos-evaluaciones.component';

import { TiposEvaluacionesRoutingModule } from './tipos-evaluaciones-routing.module';

import { AddTipoEvaluacionComponent } from './add-tipo-evaluacion/add-tipo-evaluacion.component';
import { EditTipoEvaluacionComponent } from './edit-tipo-evaluacion/edit-tipo-evaluacion.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    TiposEvaluacionesComponent,
    AddTipoEvaluacionComponent,
    EditTipoEvaluacionComponent
  ],
  imports: [
    CommonModule,
    TiposEvaluacionesRoutingModule,
    MaterialModule,
    SharedModule,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TiposEvaluacionesModule { }
