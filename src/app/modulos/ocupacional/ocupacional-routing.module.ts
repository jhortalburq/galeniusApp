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
        loadChildren: () => import('../../pages/ocupacional/protocolos/protocolos.module').then( m => m.ProtocolosModule)
      },
      {
        path: 'admision',
        loadChildren: () => import('../../pages/ocupacional/atenciones/atenciones.module').then( m => m.AtencionesModule)
      },
      {
        path: 'mantenimientos',
        loadChildren: () => import('../../pages/mantenimientos/mantenimientos-routing.module').then( m => m.MantenimientoRoutingModule)
      },
      {
        path: 'ficha_medica',
        loadChildren: () => import('../../pages/examenes/medico/medico.module').then( m => m.MedicoModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
