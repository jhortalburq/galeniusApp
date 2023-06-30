import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSucursalesComponent, DetalleSucursalComponent, EditarSucursalComponent, AgregarSucursalComponent} from './sucursales.index';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaSucursalesComponent
  },
  {
    path: 'nuevo',
    component: AgregarSucursalComponent
  },
  {
    path: ':slug/editar',
    component: EditarSucursalComponent
  },
  {
    path: ':slug/detalle',
    component: DetalleSucursalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalesRoutingModule { }
