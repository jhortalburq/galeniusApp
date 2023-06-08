import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaFamiliaComponent } from './lista-familia/lista-familia.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaFamiliaComponent,
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
export class FamiliaRoutingModule { }
