import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSublineasComponent } from './lista-sublineas/lista-sublineas.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaSublineasComponent,
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
export class SubLineasProductoRoutingModule { }
