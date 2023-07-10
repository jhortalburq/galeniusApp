import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archivos-fichas',
  templateUrl: './archivos-fichas.component.html',
  styleUrls: ['./archivos-fichas.component.scss']
})
export class ArchivosFichasComponent {
  @Input() registros;
  
  fileName: string = 'Sin archivo seleccionado';
  url_file: string = '';
  fileSubir: File = null;

  seleccionarArchivo( file: any) {
    this.url_file = '';

    let _file = file.target.files[0];

    if ( !_file ){
      this.fileSubir = null;
      this.fileName = 'Sin archivo seleccionado';
      return;
    }

    this.fileName = _file.name;
    this.fileSubir = _file;
  };

  eliminarItem( item: any) {

  }
}
