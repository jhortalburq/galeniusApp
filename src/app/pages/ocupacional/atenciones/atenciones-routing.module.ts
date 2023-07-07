import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtencionesDiariasComponent } from './atenciones-diarias/atenciones-diarias.component';
import { AgregarAtencionComponent } from './agregar-atencion/agregar-atencion.component';
import { EditarAtencionComponent } from './editar-atencion/editar-atencion.component';

const routes: Routes = [
      {
        path: 'atenciones-diarias',
        component: AtencionesDiariasComponent
      },
      {
        path: 'nueva-atencion',
        component: AgregarAtencionComponent
      },
      {
        path: ':slug/editar',
        component: EditarAtencionComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionesRoutingModule { }
