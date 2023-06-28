import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';


const routes: Routes = [

      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'pacientes',
        loadChildren: () => import('../../pacientes/pacientes.module').then( m => m.PacientesModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
