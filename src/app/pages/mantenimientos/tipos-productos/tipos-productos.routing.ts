import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTipoProductoComponent } from './lista-tipo-producto/lista-tipo-producto.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaTipoProductoComponent,
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
export class TiposProductosRoutingModule { }
