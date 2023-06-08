import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMarcaComponent } from './lista-marca/lista-marca.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaMarcaComponent,
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
export class MarcasRoutingModule { }
