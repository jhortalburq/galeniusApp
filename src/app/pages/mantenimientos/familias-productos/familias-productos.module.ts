import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaFamiliaComponent } from './lista-familia/lista-familia.component';
import { AgregarFamiliaComponent } from './agregar-familia/agregar-familia.component';
import { EditarFamiliaComponent } from './editar-familia/editar-familia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { FamiliaRoutingModule } from './familias-producto.routing';



@NgModule({
  declarations: [ListaFamiliaComponent, AgregarFamiliaComponent, EditarFamiliaComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FamiliaRoutingModule
  ],
  entryComponents: [AgregarFamiliaComponent, EditarFamiliaComponent]
})

export class FamiliasProductosModule { }
