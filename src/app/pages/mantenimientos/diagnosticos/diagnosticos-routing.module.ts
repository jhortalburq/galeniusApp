import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: DiagnosticosComponent,
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
export class DiagnosticosRoutingModule { }
