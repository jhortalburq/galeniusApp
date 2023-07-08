import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { DetallePacienteComponent } from './detalle-paciente/detalle-paciente.component';

const routes: Routes = [
      {
        path: 'lista',
        component: ListaPacientesComponent
      },
      {
        path: 'nuevo',
        component: NuevoPacienteComponent
      },
      {
        path: ':slug/editar',
        component: DetallePacienteComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
