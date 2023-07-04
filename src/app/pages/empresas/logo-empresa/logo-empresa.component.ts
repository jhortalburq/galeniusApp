import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SharedService } from '../../../services/services.index';
import { NotificationsService } from '../../../services/notifications.service';


@Component({
  selector: 'app-logo-empresa',
  templateUrl: './logo-empresa.component.html',
  styleUrls: ['./logo-empresa.component.scss']
})
export class LogoEmpresaComponent implements OnInit {

  @Input() empresa;
  @Output() submitChange = new EventEmitter();

  fileName: string = 'Sin archivo seleccionado';

  imagenSubir: File;
  imageUrl: string | ArrayBuffer = "https://bulma.io/images/placeholders/480x480.png";

  constructor(
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
  }


  seleccionImagen( event: any) {
    const imagen = event.target.files;

    if ( !imagen ){
      this.imagenSubir = null;
      this.fileName = 'Sin archivo seleccionado';
      return;
    }

    if (imagen.type.indexOf('image') <0 ){
      this.notificationService.showError('Solo es permitido imagenes', 'Error')
      this.imagenSubir = null;
      this.fileName = 'Sin archivo seleccionado';
      return
    }

    this.fileName = imagen.name;

    this.imagenSubir = imagen;
    const reader = new FileReader();
    reader.readAsDataURL( imagen );
    reader.onloadend = () => this.imageUrl = reader.result;
  };

  cambiarImagen () {
      // this.sharedService.subirLogotipo( this.imagenSubir, this.empresa.id).then(
      //     (response:any) => {
      //           this.empresa.url_logo = response.logotipo;
      //           this.submitChange.emit(true);
      //           this.notificationService.showInfo('Se editó el Logotipo de la Empresa' , 'Logo Actualizado');
      //       },
      //       err => {
      //             console.log(err);
      //       }
      //   );
  };

}
