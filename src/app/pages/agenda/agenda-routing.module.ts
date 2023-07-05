import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';
import { AgendaEspecialistaComponent } from './agenda-especialista/agenda-especialista.component';


const routes: Routes = [
      {
        path: 'diaria',
        component: AgendaDiariaComponent
      },
      {
        path: 'especialista',
        component: AgendaEspecialistaComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
