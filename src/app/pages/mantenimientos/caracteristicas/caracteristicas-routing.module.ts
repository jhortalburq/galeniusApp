import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCaracteristicasComponent } from './lista-caracteristicas/lista-caracteristicas.component';
import { RegistrosComponent } from './registros/registros.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListaCaracteristicasComponent,
      },
      {
        path: ':id_caracteristica/registros',
        component: RegistrosComponent,
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
export class CaracteristicasRoutingModule { }
