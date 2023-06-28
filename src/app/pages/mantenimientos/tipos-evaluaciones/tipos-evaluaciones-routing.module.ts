import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposEvaluacionesComponent } from './tipos-evaluaciones/tipos-evaluaciones.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: TiposEvaluacionesComponent,
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
export class TiposEvaluacionesRoutingModule { }
