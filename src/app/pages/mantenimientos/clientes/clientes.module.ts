import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { ClientesRoutingModule } from './clientes.routing';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';



@NgModule({
  declarations: [ListaClientesComponent, AgregarClienteComponent, EditarClienteComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ClientesRoutingModule
  ],
  // entryComponents: [ AgregarClienteComponent, EditarClienteComponent]

})
export class ClientesModule { }
