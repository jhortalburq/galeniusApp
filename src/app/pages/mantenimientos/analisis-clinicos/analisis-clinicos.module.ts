import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisClinicosComponent } from './analisis-clinicos/analisis-clinicos.component';

import { AnalisisClinicosRoutingModule } from './analisis-clinicos-routing.module';

import { AddAnalisisClinicoComponent } from './add-analisis-clinico/add-analisis-clinico.component';
import { EditAnalisisClinicoComponent } from './edit-analisis-clinico/edit-analisis-clinico.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
import { Select2Module } from 'ng-select2-component';

@NgModule({
  declarations: [
    AnalisisClinicosComponent,
    AddAnalisisClinicoComponent,
    EditAnalisisClinicoComponent
  ],
  imports: [
    CommonModule,
    AnalisisClinicosRoutingModule,
    MaterialModule,
    SharedModule,
    Select2Module,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AnalisisClinicosModule { }
