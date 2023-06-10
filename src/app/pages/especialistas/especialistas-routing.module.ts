import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { NuevoEspecialistaComponent } from './nuevo-especialista/nuevo-especialista.component';
import { EditarEspecialistaComponent } from './editar-especialista/editar-especialista.component';
import { DetalleEspecialistaComponent } from './detalle-especialista/detalle-especialista.component';


const routes: Routes = [
      {
        path: 'lista',
        component: ListaEspecialistasComponent
      },
      {
        path: 'nuevo',
        component: NuevoEspecialistaComponent
      },
      {
        path: ':slug/editar',
        component: EditarEspecialistaComponent
      },
      {
        path: ':slug/detalle',
        component: DetalleEspecialistaComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistasRoutingModule { }
