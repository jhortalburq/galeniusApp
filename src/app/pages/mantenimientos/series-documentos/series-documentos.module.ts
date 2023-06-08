import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSeriesComponent } from './lista-series/lista-series.component';
import { AgregarSerieComponent } from './agregar-serie/agregar-serie.component';
import { EditarSerieComponent } from './editar-serie/editar-serie.component';



@NgModule({
  declarations: [ListaSeriesComponent, AgregarSerieComponent, EditarSerieComponent],
  imports: [
    CommonModule
  ]
})
export class SeriesDocumentosModule { }
