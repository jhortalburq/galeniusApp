import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';


const routes: Routes = [
      {
        path: 'citas-programadas',
        component: CitasProgramadasComponent
      },
      {
        path: 'agregar-cita',
        component: NuevaCitaComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
