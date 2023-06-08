import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaLineasComponent } from './lista-lineas/lista-lineas.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaLineasComponent,
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
export class LineasProductoRoutingModule { }
