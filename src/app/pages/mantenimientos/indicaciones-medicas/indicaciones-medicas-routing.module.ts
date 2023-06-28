import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicacionesMedicasComponent } from './indicaciones-medicas/indicaciones-medicas.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: IndicacionesMedicasComponent,
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
export class IndicacionesMedicasRoutingModule { }
