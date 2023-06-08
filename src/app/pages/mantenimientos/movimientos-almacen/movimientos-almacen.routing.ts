import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimientosListaComponent } from './movimientos-almacen.index';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: MovimientosListaComponent,
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
export class MovimientosAlmacenRoutingModule { }
