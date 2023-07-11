import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';
import { Select2Module } from 'ng-select2-component';

import { ListaExamenesComponentComponent } from './componentes/lista-examenes-component/lista-examenes-component.component';
import { FiltroExamenesComponentComponent } from './componentes/filtro-examenes-component/filtro-examenes-component.component';
import { HeaderFichaComponent } from './componentes/header-ficha/header-ficha.component';
import { TriajeComponent } from './componentes/triaje/triaje.component';
import { DiagnosticosFichasComponent } from './componentes/diagnosticos-fichas/diagnosticos-fichas.component';
import { ArchivosFichasComponent } from './componentes/archivos-fichas/archivos-fichas.component';
import { HistorialComponent } from './componentes/historial/historial.component';



@NgModule({
  declarations: [
    ListaExamenesComponentComponent,
    FiltroExamenesComponentComponent,
    HeaderFichaComponent,
    TriajeComponent,
    DiagnosticosFichasComponent,
    ArchivosFichasComponent,
    HistorialComponent,
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
    TriajeComponent,
    DiagnosticosFichasComponent,
    ArchivosFichasComponent,
    HistorialComponent
  ]
})
export class ExamenesModule { }
