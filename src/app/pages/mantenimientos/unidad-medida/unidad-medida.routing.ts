import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaUnidadesComponent } from './lista-unidades/lista-unidades.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaUnidadesComponent,
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
export class UnidadMedidaRoutingModule { }
