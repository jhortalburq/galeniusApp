import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { Select2Module } from 'ng-select2-component';
import { SharedModule } from '../../../shared/shared.module';
import { ExamenesModule } from '../examenes.module';
import { EKGRoutingModule } from './ekg-routing.module';

import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { DetalleEkgComponent } from './detalle-ekg/detalle-ekg.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';


@NgModule({
  declarations: [
    ListaExamenesComponent,
    DetalleEkgComponent,
    EvaluacionComponent,
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
    EKGRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EkgModule { }
