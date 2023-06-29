import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
import { Select2Module } from 'ng-select2-component';

import { AddEstudioGabineteComponent } from './add-estudio-gabinete/add-estudio-gabinete.component';
import { EditEstudioGabineteComponent } from './edit-estudio-gabinete/edit-estudio-gabinete.component';
import { EstudiosGabineteComponent } from './estudios-gabinete/estudios-gabinete.component';

import { EstudiosGabineteRoutingModule } from './estudios-gabinete-routing.module';

@NgModule({
  declarations: [
    EstudiosGabineteComponent,
    AddEstudioGabineteComponent,
    EditEstudioGabineteComponent,
  ],
  imports: [
    CommonModule,
    EstudiosGabineteRoutingModule,
    MaterialModule,
    SharedModule,
    Select2Module,
    MDBBootstrapModulesPro,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EstudiosGabineteModule { }
