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
        loadChildren: () => import('../../pages/clinico/agenda/agenda.module').then( m => m.AgendaModule)
      },
      {
        path: 'citas',
        loadChildren: () => import('../../pages/clinico/citas/citas.module').then( m => m.CitasModule)
      },
      {
        path: 'horarios',
        loadChildren: () => import('../../pages/clinico/horarios/horarios.module').then( m => m.HorariosModule)
      },
      {
        path: 'especialistas',
        loadChildren: () => import('../../pages/especialistas/especialistas.module').then( m => m.EspecialistasModule)
      },
      {
        path: 'consultas',
        loadChildren: () => import('../../pages/clinico/consultas/consultas.module').then( m => m.ConsultasModule)
      },
      {
        path: 'pacientes',
        loadChildren: () => import('../../pages/pacientes/pacientes.module').then( m => m.PacientesModule)
      },
      {
        path: 'mantenimientos',
        loadChildren: () => import('../../pages/mantenimientos/mantenimientos-routing.module').then( m => m.MantenimientoRoutingModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
