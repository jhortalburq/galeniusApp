import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';


const routes: Routes = [

      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'agenda',
        loadChildren: () => import('../../agenda/agenda.module').then( m => m.AgendaModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('../../citas/citas.module').then( m => m.CitasModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
