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
        loadChildren: () => import('../../pages/pacientes/pacientes.module').then( m => m.PacientesModule)
      },
      {
        path: 'empresas',
        loadChildren: () => import('../../pages/empresas/empresas.module').then( m => m.EmpresasModule)
      },
      {
        path: 'protocolos',
        loadChildren: () => import('../../pages/protocolos/protocolos.module').then( m => m.ProtocolosModule)
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
