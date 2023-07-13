import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';
import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';


const routes: Routes = [
      {
        path: 'diaria',
        component: AgendaDiariaComponent
      },
      {
        path: 'citas-programadas',
        component: CitasProgramadasComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
