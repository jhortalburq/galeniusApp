import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisisClinicosComponent } from './analisis-clinicos/analisis-clinicos.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: AnalisisClinicosComponent,
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
export class AnalisisClinicosRoutingModule { }
