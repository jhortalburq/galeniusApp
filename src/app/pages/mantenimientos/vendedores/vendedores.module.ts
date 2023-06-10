import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { VendedoresRoutingModule } from './vendedores.routing';

import { EditarVendedorComponent } from './editar-vendedor/editar-vendedor.component';
import { AgregarVendedorComponent } from './agregar-vendedor/agregar-vendedor.component';
import { ListaVendedoresComponent } from './lista-vendedores/lista-vendedores.component';



@NgModule({
  declarations: [EditarVendedorComponent, AgregarVendedorComponent, ListaVendedoresComponent],
  imports: [
    CommonModule,
      MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    VendedoresRoutingModule
  ],
  // entryComponents: [ AgregarVendedorComponent, EditarVendedorComponent]
})
export class VendedoresModule { }
