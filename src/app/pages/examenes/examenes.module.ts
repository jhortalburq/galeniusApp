import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { Select2Module } from 'ng-select2-component';

import { ListaExamenesComponentComponent } from './componentes/lista-examenes-component/lista-examenes-component.component';
import { FiltroExamenesComponentComponent } from './componentes/filtro-examenes-component/filtro-examenes-component.component';
import { HeaderFichaComponent } from './componentes/header-ficha/header-ficha.component';
import { TriajeComponent } from './componentes/triaje/triaje.component';



@NgModule({
  declarations: [
    ListaExamenesComponentComponent,
    FiltroExamenesComponentComponent,
    HeaderFichaComponent,
    TriajeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModulesPro,
    Select2Module,
  ],
  exports:[
    ListaExamenesComponentComponent,
    FiltroExamenesComponentComponent,
    HeaderFichaComponent,
    TriajeComponent
  ]
})
export class ExamenesModule { }
