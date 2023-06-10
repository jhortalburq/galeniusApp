import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';



const routes: Routes = [
      {
        path: 'citas-programadas',
        component: CitasProgramadasComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
