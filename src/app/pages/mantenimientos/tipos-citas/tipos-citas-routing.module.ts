import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposCitasComponent } from './tipos-citas/tipos-citas.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: TiposCitasComponent,
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
export class TiposCitasRoutingModule { }
