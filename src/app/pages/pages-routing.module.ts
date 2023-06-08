import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { PagesComponent } from './pages.component';

import { AuthService } from '../services/services.index';

const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      canActivate: [AuthService],
      children: [
        {
          path: 'menu',
          component: MenuComponent
        },
        {
          path: 'comercial',
          loadChildren: () => import('./modulos/comercial/comercial.module').then( m => m.ComercialModule)
        },
        {
          path: 'pos',
          loadChildren: () => import('./modulos/pos/pos.module').then( m => m.PosModule)
        },
        {
          path: 'inventario',
          loadChildren: () => import('./modulos/inventario/inventario.module').then( m => m.InventarioModule)
        },
        {
          path: 'pedidos',
          loadChildren: () => import('./modulos/pedidos/pedidos.module').then( m => m.PedidosModule)
        },
        {
          path: 'administrador',
          loadChildren: () => import('./modulos/administrador/administrador.module').then( m => m.AdministradorModule)
        },
         {
          path: '',
          redirectTo: '/menu',
          pathMatch: 'full'
        },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
