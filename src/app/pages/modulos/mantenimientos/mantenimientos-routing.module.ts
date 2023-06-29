import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'sucursales',
        loadChildren: () => import('../../sucursales/sucursales.module').then( m => m.SucursalesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../../usuarios/usuarios.module').then( m => m.UsuariosModule)
      },
      {
        path: 'empresas',
        loadChildren: () => import('../../empresas/empresas.module').then( m => m.EmpresasModule)
      },
      {
        path: 'mantenimientos',
        loadChildren: () => import('../../mantenimientos/mantenimientos.module').then( m => m.MantenimientosModule)
      },
      {
        path: 'especialistas',
        loadChildren: () => import('../../especialistas/especialistas.module').then( m => m.EspecialistasModule)
      },
      {
          path: '',
          redirectTo: 'menu',
          pathMatch: 'full'
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
