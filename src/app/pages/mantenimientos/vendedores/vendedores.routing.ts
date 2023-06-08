import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVendedoresComponent } from './vendedores.index';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaVendedoresComponent,
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
export class VendedoresRoutingModule { }
