import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSucursalesComponent, DetalleSucursalComponent} from './sucursales.index';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: ListaSucursalesComponent,
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
export class SucursalesRoutingModule { }
