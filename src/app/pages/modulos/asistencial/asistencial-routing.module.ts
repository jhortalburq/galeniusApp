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
      {
        path: 'horarios',
        loadChildren: () => import('../../horarios/horarios.module').then( m => m.HorariosModule)
      },
      {
        path: 'especialistas',
        loadChildren: () => import('../../especialistas/especialistas.module').then( m => m.EspecialistasModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
