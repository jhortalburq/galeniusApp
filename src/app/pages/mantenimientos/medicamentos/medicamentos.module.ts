import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';

import { AddMedicamentoComponent } from './add-medicamento/add-medicamento.component';
import { EditMedicamentoComponent } from './edit-medicamento/edit-medicamento.component';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
import { Select2Module } from 'ng-select2-component';

@NgModule({
  declarations: [
    MedicamentosComponent,
    AddMedicamentoComponent,
    EditMedicamentoComponent
  ],
  imports: [
    CommonModule,
    MedicamentosRoutingModule,
    MaterialModule,
    SharedModule,
    Select2Module,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MedicamentosModule { }
