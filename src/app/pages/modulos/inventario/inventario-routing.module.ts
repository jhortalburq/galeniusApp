import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { InventarioComponent } from './inventario.component';


const routes: Routes = [
    {
      path: 'menu',
      component: MenuComponent,
    },
    {
      path: 'sucursales',
      loadChildren: () => import('../../mantenimientos/sucursales/sucursales.module').then( m => m.SucursalesModule)
    },
    {
      path: 'proveedores',
      loadChildren: () => import('../../mantenimientos/proveedores/proveedores.module').then( m => m.ProveedoresModule)
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
      path: 'unidades-medidas',
      loadChildren: () => import('../../mantenimientos/unidad-medida/unidad-medida.module').then( m => m.UnidadMedidaModule)
    },

    {
      path: 'marcas',
      loadChildren: () => import('../../mantenimientos/marca/marca.module').then( m => m.MarcaModule)
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
