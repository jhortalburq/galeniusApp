import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiosGabineteComponent } from './estudios-gabinete.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: EstudiosGabineteComponent,
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
export class EstudiosGabineteRoutingModule { }
