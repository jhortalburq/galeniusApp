import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProtocolosComponent } from './lista-protocolos/lista-protocolos.component';
import { NuevoProtocoloComponent } from './nuevo-protocolo/nuevo-protocolo.component';
import { EditarProtocoloComponent } from './editar-protocolo/editar-protocolo.component';

const routes: Routes = [
      {
        path: 'lista',
        component: ListaProtocolosComponent
      },
      {
        path: 'nuevo',
        component: NuevoProtocoloComponent
      },
      {
        path: ':slug/editar',
        component: EditarProtocoloComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolosRoutingModule { }
