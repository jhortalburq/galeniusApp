import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
      {
        path: 'lista',
        component: ListaExamenesComponent
      },
      {
        path: ':orden_slug/detalle/:slug',
        component: DetalleComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OsteomuscularRoutingModule { }
