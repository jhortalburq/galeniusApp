import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProveedoresComponent } from './proveedores.index';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaProveedoresComponent,
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
export class ProveedorRoutingModule { }
