import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        SharedService,
        EmpresasService,
        AlertService
} from '../../../services/services.index';

@Component({
  selector: 'app-datos-biometricos',
  templateUrl: './datos-biometricos.component.html',
  styleUrls: ['./datos-biometricos.component.scss']
})
export class DatosBiometricosComponent {

  registro: any = {};

  registerForm: FormGroup;

  imagen: FormControl;
  firma: FormControl;
  huella: FormControl;

  imagenSubir: File;
  imageUrl: string | ArrayBuffer = "assets/img/image.png";

  url_logo: string = '';
  fileName: string = 'Sin archivo seleccionado';

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public empresaService: EmpresasService,
    public sharedService: SharedService,
    public alertService: AlertService,
  ) {}

  async ngOnInit() {
      this.createFormControls();
      this.createForm();
    }

  createFormControls() {
      this.imagen = new FormControl('');
      this.firma = new FormControl('');
      this.huella = new FormControl('');
  }

  createForm() {
    this.registerForm = new FormGroup({
      imagen: this.imagen,
      firma: this.firma,
      huella: this.huella,
    });
  }

  seleccionImagen( img: any) {
    this.url_logo = '';

    let imagen = img.target.files[0];

    if ( !imagen ){
      this.imagenSubir = null;
      this.fileName = 'Sin archivo seleccionado';
      return;
    }

    if (imagen.type.indexOf('image') <0 ){
      // this.notificationService.showError('Solo es permitido imagenes', 'Error')
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
      // this.sharedService.subirLogotipoSucursal(this.imagenSubir, this.registro.id, this.sharedService.organizacion_seleccionada.id).then(
      //     (response:any) => {
      //           this.registro.url_logo = response.logotipo;
      //           this.submitChange.emit(true);
      //           this.notificationService.showInfo('Se editó el Logotipo de la Empresa' , 'Logo Actualizado');
      //           this.sharedService.sucursal_seleccionada.logo = response.logotipo; 
      //         },
      //       err => {
      //         console.log(err);
      //       }
      //   );
  };


}
