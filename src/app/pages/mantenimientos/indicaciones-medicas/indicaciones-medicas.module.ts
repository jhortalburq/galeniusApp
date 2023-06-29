import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicacionesMedicasComponent } from './indicaciones-medicas/indicaciones-medicas.component';
import { IndicacionesMedicasRoutingModule } from './indicaciones-medicas-routing.module';

import { AddIndicacionComponent } from './add-indicacion/add-indicacion.component';
import { EditIndicacionComponent } from './edit-indicacion/edit-indicacion.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    IndicacionesMedicasComponent,
    AddIndicacionComponent,
    EditIndicacionComponent
  ],
  imports: [
    CommonModule,
    IndicacionesMedicasRoutingModule,
    MaterialModule,
    SharedModule,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IndicacionesMedicasModule { }
