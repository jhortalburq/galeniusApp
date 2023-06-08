import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPreciosComponent } from './lista-precios/lista-precios.component';
import { AgregarListaComponent } from './agregar-lista/agregar-lista.component';
import { EditarListaComponent } from './editar-lista/editar-lista.component';



@NgModule({
  declarations: [ListaPreciosComponent, AgregarListaComponent, EditarListaComponent],
  imports: [
    CommonModule
  ]
})
export class ListasPreciosModule { }
