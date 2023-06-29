import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from '../../../../ng-uikit-pro-standard/src/lib/mdb.module';

import { UsuarioRoutingModule } from './usuarios.routing';

import { ListaUsuariosComponent, AgregarUsuariosComponent } from './usuarios.index';

import localeEsPe from '@angular/common/locales/es-PE';

registerLocaleData(localeEsPe, 'es');


@NgModule({
  declarations: [ListaUsuariosComponent, AgregarUsuariosComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Pe' } ],
  // entryComponents: [ AgregarUsuariosComponent]
})
export class UsuariosModule { }
