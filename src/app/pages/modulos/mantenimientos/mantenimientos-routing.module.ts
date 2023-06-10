import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MantenimientosComponent } from './mantenimientos.component'
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'organizaciones',
        loadChildren: () => import('../../mantenimientos/organizaciones/organizaciones.module').then( m => m.OrganizacionesModule)
      },       
      {
        path: 'sucursales',
        loadChildren: () => import('../../mantenimientos/sucursales/sucursales.module').then( m => m.SucursalesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../../mantenimientos/usuarios/usuarios.module').then( m => m.UsuariosModule)
      },
      {
        path: 'empresas',
        loadChildren: () => import('../../mantenimientos/empresas/empresas.module').then( m => m.EmpresasModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('../../mantenimientos/clientes/clientes.module').then( m => m.ClientesModule)
      },
      {
        path: 'estudios-gabinete',
        loadChildren: () => import('../../mantenimientos/estudios-gabinete/estudios-gabinete.module').then( m => m.EstudiosGabineteModule)
      },
      {
        path: 'analisis-clinicos',
        loadChildren: () => import('../../mantenimientos/analisis-clinicos/analisis-clinicos.module').then( m => m.AnalisisClinicosModule)
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
