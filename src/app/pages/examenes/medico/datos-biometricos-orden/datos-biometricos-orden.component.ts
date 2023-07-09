import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, 
        MantenimientoService, 
        SharedService,
        EmpresasService,
        NotificationsService,
        AlertService
} from '../../../../services/services.index';

@Component({
  selector: 'app-datos-biometricos-orden',
  templateUrl: './datos-biometricos-orden.component.html',
  styleUrls: ['./datos-biometricos-orden.component.scss']
})
export class DatosBiometricosOrdenComponent {
  @Output() submitChange = new EventEmitter();
  @Input() registro;

  disabled: boolean = false;

  changeImage: boolean = false;
  changeFirma: boolean = false;
  changeHuella: boolean = false;

  imagenSubir: File = null;
  firmaSubir: File = null;
  huellaSubir: File = null;

  imageUrl: string | ArrayBuffer = "assets/img/image.png";
  firmaUrl: string | ArrayBuffer = "assets/img/image.png";
  huellaUrl: string | ArrayBuffer = "assets/img/image.png";

  url_imagen: string = '';
  fileName_imagen: string = 'Sin archivo seleccionado';

  url_firma: string = '';
  fileName_firma: string = 'Sin archivo seleccionado';
  
  url_huella: string = '';
  fileName_huella: string = 'Sin archivo seleccionado';

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public empresaService: EmpresasService,
    public sharedService: SharedService,
    private router: Router,
    public notificationService: NotificationsService,
    public alertService: AlertService,
  ) {}

  async ngOnInit() {
  }
  
  ngOnChanges() {
    this.url_imagen = this.registro.imagen;
    this.url_firma = this.registro.firma;
    this.url_huella = this.registro.huella;
  }

  seleccionImagen( img: any) {
    this.url_imagen = '';

    let imagen = img.target.files[0];

    if ( !imagen ){
      this.imagenSubir = null;
      this.fileName_imagen = 'Sin archivo seleccionado';
      return;
    }

    if (imagen.type.indexOf('image') <0 ){
      this.notificationService.showError('Solo es permitido imagenes', 'Error')
      this.imagenSubir = null;
      this.fileName_imagen = 'Sin archivo seleccionado';
      return
    }

    this.fileName_imagen = imagen.name;
    this.imagenSubir = imagen;
    this.changeImage = true;
    const reader = new FileReader();
    reader.readAsDataURL( imagen );
    reader.onloadend = () => this.imageUrl = reader.result;
  };

  seleccionFirma( img: any) {
    this.url_firma = '';

    let imagen = img.target.files[0];

    if ( !imagen ){
      this.firmaSubir = null;
      this.fileName_firma = 'Sin archivo seleccionado';
      return;
    }

    if (imagen.type.indexOf('image') <0 ){
      this.notificationService.showError('Solo es permitido imagenes', 'Error')
      this.firmaSubir = null;
      this.fileName_firma = 'Sin archivo seleccionado';
      return
    }

    this.fileName_firma = imagen.name;
    this.firmaSubir = imagen;
    this.changeFirma = true;
    const reader = new FileReader();
    reader.readAsDataURL( imagen );
    reader.onloadend = () => this.firmaUrl = reader.result;
  };

  seleccionHuella( img: any) {
    this.url_huella = '';

    let imagen = img.target.files[0];

    if ( !imagen ){
      this.huellaSubir = null;
      this.fileName_huella = 'Sin archivo seleccionado';
      return;
    }

    if (imagen.type.indexOf('image') <0 ){
      this.notificationService.showError('Solo es permitido imagenes', 'Error')
      this.huellaSubir = null;
      this.fileName_huella = 'Sin archivo seleccionado';
      return
    }

    this.fileName_huella = imagen.name;
    this.huellaSubir = imagen;
    this.changeHuella = true;
    const reader = new FileReader();
    reader.readAsDataURL( imagen );
    reader.onloadend = () => this.huellaUrl = reader.result;
  };

  regresar() {
    if (this.registro.id) {
      let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
      this.router.navigate([url]);
    }
  }

  onSubmit() {
    this.submitChange.emit({
        imagen: this.imagenSubir,
        firma: this.firmaSubir,
        huella: this.huellaSubir,
        changeImage: this.changeImage,
        changeFirma: this.changeFirma,
        changeHuella: this.changeHuella
    });
  }

  quitarFirma() {
    this.url_firma = '';
    this.firmaSubir = null;
    this.changeFirma = true;
    this.firmaUrl = "assets/img/image.png";
  }

  quitarHuella() {
    this.huellaSubir = null;
    this.url_huella = '';
    this.changeHuella = true;
    this.huellaUrl = "assets/img/image.png";
  }

  quitarImagen() {
      this.imagenSubir = null;
      this.imageUrl = "assets/img/image.png";
      this.url_imagen = '';
      this.changeImage = true;
  }
}
