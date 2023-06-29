import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { SeleccionarModuloComponent } from './seleccionar-modulo/seleccionar-modulo.component';
import { SeleccionarSucursalComponent } from './seleccionar-sucursal/seleccionar-sucursal.component';
import { MenuComponent } from './menu/menu.component';

import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'menu',
          component: MenuComponent
        },
        {
          path: 'seleccionar-sucursal',
          component: SeleccionarSucursalComponent
        },
        {
          path: 'seleccionar-modulo',
          component: SeleccionarModuloComponent
        },
        {
          path: 'organizaciones',
          loadChildren: () => import('./organizaciones/organizaciones.module').then( m => m.OrganizacionesModule)
        },
        {
          path: 'administrador',
          loadChildren: () => import('../modulos/mantenimientos/mantenimientos.module').then( m => m.MantenimientosModule)
        },
        {
          path: 'asistencial',
          loadChildren: () => import('../modulos/asistencial/asistencial.module').then( m => m.AsistencialModule)
        },
        {
          path: 'ocupacional',
          loadChildren: () => import('../modulos/ocupacional/ocupacional.module').then( m => m.OcupacionalModule)
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
