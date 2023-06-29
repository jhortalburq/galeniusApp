import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaUsuariosComponent } from './usuarios.index';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaUsuariosComponent,
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
export class UsuarioRoutingModule { }
