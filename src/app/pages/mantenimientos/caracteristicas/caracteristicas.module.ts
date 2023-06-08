import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from '../../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { CaracteristicasRoutingModule } from './caracteristicas-routing.module';
import { ListaCaracteristicasComponent } from './lista-caracteristicas/lista-caracteristicas.component';
import { AgregarCaracteristicaComponent } from './agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from './editar-caracteristica/editar-caracteristica.component';
import { RegistrosComponent } from './registros/registros.component';


@NgModule({
  declarations: [ListaCaracteristicasComponent, AgregarCaracteristicaComponent, EditarCaracteristicaComponent, RegistrosComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CaracteristicasRoutingModule
  ]
})
export class CaracteristicasModule { }
