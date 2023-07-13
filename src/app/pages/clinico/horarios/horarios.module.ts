import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IngresarHorarioComponent } from './ingresar-horario/ingresar-horario.component';
import { HorariosComponent } from './horarios/horarios.component';

import { HorariosRoutingModule } from './horararios-routing.module';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from'../../../shared/shared.module';


@NgModule({
  declarations: [
    IngresarHorarioComponent,
    HorariosComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HorariosRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HorariosModule { }
