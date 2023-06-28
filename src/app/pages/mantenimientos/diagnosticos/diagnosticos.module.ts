import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';
import { AddDiagnosticoComponent } from './add-diagnostico/add-diagnostico.component';
import { EditDiagnosticoComponent } from './edit-diagnostico/edit-diagnostico.component';

import { DiagnosticosRoutingModule } from './diagnosticos-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    DiagnosticosComponent,
    AddDiagnosticoComponent,
    EditDiagnosticoComponent
  ],
  imports: [
    CommonModule,
    DiagnosticosRoutingModule,
    MaterialModule,
    SharedModule,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DiagnosticosModule { }
