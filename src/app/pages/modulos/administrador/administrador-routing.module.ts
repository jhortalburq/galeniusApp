import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { AdministradorComponent } from './administrador.component';


const routes: Routes = [
    {
      path: '',
      component: AdministradorComponent,
      children: [
        {
          path: 'menu',
          component: MenuComponent,
        },
         {
          path: 'empresas',
          loadChildren: () => import('../../mantenimientos/empresas/empresas.module').then( m => m.EmpresasModule)
        },
         {
          path: 'sucursales',
          loadChildren: () => import('../../mantenimientos/sucursales/sucursales.module').then( m => m.SucursalesModule)
        },
        {
          path: 'clientes',
          loadChildren: () => import('../../mantenimientos/clientes/clientes.module').then( m => m.ClientesModule)
        },
        {
          path: 'usuarios',
          loadChildren: () => import('../../mantenimientos/usuarios/usuarios.module').then( m => m.UsuariosModule)
        },
        {
          path: 'vendedores',
          loadChildren: () => import('../../mantenimientos/vendedores/vendedores.module').then( m => m.VendedoresModule)
        },
         {
          path: 'proveedores',
          loadChildren: () => import('../../mantenimientos/proveedores/proveedores.module').then( m => m.ProveedoresModule)
        },
        {
          path: 'familias-productos',
          loadChildren: () => import('../../mantenimientos/familias-productos/familias-productos.module').then( m => m.FamiliasProductosModule)
        },
        {
          path: 'lineas-productos',
          loadChildren: () => import('../../mantenimientos/lineas-productos/lineas-productos.module').then( m => m.LineasProductosModule)
        },
        {
          path: 'sublineas-productos',
          loadChildren: () => import('../../mantenimientos/sublineas-productos/sublineas-productos.module').then( m => m.SublineasProductosModule)
        },
        {
          path: 'productos',
          loadChildren: () => import('../../mantenimientos/productos/productos.module').then( m => m.ProductosModule)
        },

        {
          path: 'unidades-medidas',
          loadChildren: () => import('../../mantenimientos/unidad-medida/unidad-medida.module').then( m => m.UnidadMedidaModule)
        },

        {
          path: 'movimientos-almacen',
          loadChildren: () => import('../../mantenimientos/movimientos-almacen/movimientos-almacen.module').then( m => m.MovimientosAlmacenModule)
        },

        {
          path: 'almacenes',
          loadChildren: () => import('../../mantenimientos/almacen/almacen.module').then( m => m.AlmacenModule)
        },

        {
          path: 'marcas',
          loadChildren: () => import('../../mantenimientos/marca/marca.module').then( m => m.MarcaModule)
        },

        {
          path: 'tipos-productos',
          loadChildren: () => import('../../mantenimientos/tipos-productos/tipos-productos.module').then( m => m.TiposProductosModule)
        },

        {
          path: 'caracteristicas',
          loadChildren: () => import('../../mantenimientos/caracteristicas/caracteristicas.module').then( m => m.CaracteristicasModule)
        },

        {
            path: '',
            redirectTo: 'menu',
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
