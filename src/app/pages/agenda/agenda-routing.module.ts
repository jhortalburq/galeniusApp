import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';



const routes: Routes = [
      {
        path: 'diaria',
        component: AgendaDiariaComponent
      },
      // {
      //   path: 'semanal',
      //   component: AgendaSemanalComponent
      // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
