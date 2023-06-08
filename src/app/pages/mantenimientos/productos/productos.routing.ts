import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaProductosComponent,
        },
        {
          path: 'nuevo',
          component: AgregarProductoComponent,
        },
        {
          path: ':idproducto/editar',
          component: EditarProductoComponent,
        },
        {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
        },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
