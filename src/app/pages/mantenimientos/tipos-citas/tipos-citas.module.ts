import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposCitasComponent } from './tipos-citas/tipos-citas.component';

import { TiposCitasRoutingModule } from './tipos-citas-routing.module';

import { AddTipoCitaComponent } from './add-tipo-cita/add-tipo-cita.component';
import { EditTipoCitaComponent } from './edit-tipo-cita/edit-tipo-cita.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    TiposCitasComponent,
    AddTipoCitaComponent,
    EditTipoCitaComponent,
  ],
  imports: [
    CommonModule,
    TiposCitasRoutingModule,
    MaterialModule,
    SharedModule,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TiposCitasModule { }
