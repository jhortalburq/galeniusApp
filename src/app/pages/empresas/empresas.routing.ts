import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEmpresasComponent } from './empresas.index';
import { AgregarEmpresaComponent } from './agregar-empresa/agregar-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'lista',
          component: ListaEmpresasComponent,
        },
        {
          path: 'nuevo',
          component: AgregarEmpresaComponent,
        },
        {
          path: ':slug/editar',
          component: EditarEmpresaComponent,
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
