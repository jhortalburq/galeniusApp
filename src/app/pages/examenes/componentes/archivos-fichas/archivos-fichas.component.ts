import { Component, Input, EventEmitter, Output } from '@angular/core';

import { BreadcrumbsService, 
  SharedService,
  AlertService,
  ExamenesService
} from '../../../../services/services.index';


@Component({
  selector: 'app-archivos-fichas',
  templateUrl: './archivos-fichas.component.html',
  styleUrls: ['./archivos-fichas.component.scss']
})
export class ArchivosFichasComponent {
  @Input() registros;
  @Input() slug;
  @Input() clave;
  @Input() programa;
  @Output() submitChange = new EventEmitter();

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    public alertService: AlertService,
    public examenesService: ExamenesService,
  ) {}

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

    this.submit(this.fileSubir);

  };

  eliminarItem( item: any) {
    this.examenesService.deleteArchivoFicha(item, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa, this.clave, this.slug)
        .subscribe((response: any) => {
            this.submitChange.emit(true);
            this.alertService.successSwalToast('Archivo Eliminado', 2000);
        });
  }

  submit(file) {
    this.alertService.warningSwalToast('Cargando Archivo', 2000);

    this.examenesService.updateArchivoFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa, this.clave, this.slug, file)
        .then((response: any) => {
            this.fileName = '';
            this.submitChange.emit(true);
            this.alertService.successSwalToast('Archivo Subido', 2000);
        });
  }
}
