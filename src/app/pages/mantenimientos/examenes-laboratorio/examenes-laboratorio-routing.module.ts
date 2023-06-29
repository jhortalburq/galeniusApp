import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamenesLaboratorioComponent } from './examenes-laboratorio/examenes-laboratorio.component';
import { DetailExamenLaboratorioComponent } from './detail-examen-laboratorio/detail-examen-laboratorio.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ExamenesLaboratorioComponent,
        },
        {
          path: ':id/detalle',
          component: DetailExamenLaboratorioComponent,
        },
        {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
        },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesLaboratorioRoutingModule { }
