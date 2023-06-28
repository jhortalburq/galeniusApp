import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadesComponent } from './especialidades.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: EspecialidadesComponent,
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
export class EspecialidadesRoutingModule { }
