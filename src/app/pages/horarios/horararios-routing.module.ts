import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableroGeneralComponent } from './tablero-general/tablero-general.component';
import { IngresarHorarioComponent } from './ingresar-horario/ingresar-horario.component';
import { HorarioDetalleComponent } from './horario-detalle/horario-detalle.component';
import { HorariosComponent } from './horarios/horarios.component';

const routes: Routes = [
      {
        path: 'tablero-general',
        component: TableroGeneralComponent
      },
      {
        path: 'ingresar-horario',
        component: IngresarHorarioComponent
      },      
      {
        path: 'horarios-especialistas',
        component: HorariosComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
