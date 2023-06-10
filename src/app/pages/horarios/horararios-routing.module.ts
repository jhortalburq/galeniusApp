import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableroGeneralComponent } from './tablero-general/tablero-general.component';
import { IngresarHorarioComponent } from './ingresar-horario/ingresar-horario.component';
import { HorarioDetalleComponent } from './horario-detalle/horario-detalle.component';

const routes: Routes = [
      {
        path: 'tablero-general',
        component: TableroGeneralComponent
      },
      {
        path: 'ingresar-horario',
        component: IngresarHorarioComponent
      },      {
        path: 'detalle',
        component: HorarioDetalleComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }