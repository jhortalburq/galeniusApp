import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEmpresasComponent } from './empresas.index';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaEmpresasComponent,
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
export class EmpresaRoutingModule { }
