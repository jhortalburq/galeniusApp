import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaConsultasComponent } from './lista-consultas/lista-consultas.component';


const routes: Routes = [
      {
        path: 'consultas-medicas',
        component: ListaConsultasComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
