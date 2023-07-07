import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorariosComponent } from './horarios/horarios.component';

const routes: Routes = [
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
