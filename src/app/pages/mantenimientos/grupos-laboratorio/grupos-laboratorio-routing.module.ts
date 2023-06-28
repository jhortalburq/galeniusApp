import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoLaboratorioComponent } from './grupo-laboratorio/grupo-laboratorio.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: GrupoLaboratorioComponent,
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
export class GrupoLaboratorioRoutingModule { }
