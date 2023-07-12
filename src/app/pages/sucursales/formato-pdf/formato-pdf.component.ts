import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService, NotificationsService, MantenimientoService, BreadcrumbsService} from '../../../services/services.index';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-formato-pdf',
  templateUrl: './formato-pdf.component.html',
  styleUrls: ['./formato-pdf.component.scss']
})
export class FormatoPDFComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  disabled: boolean = false;

  registerForm: FormGroup;

  logo_w: number = 160;
  footer: any;
  ubicacion_logo: number = 1;

  fileName: string = 'Sin archivo seleccionado';

  url_logo: string = '';

  imagenSubir: File;
  imageUrl: string | ArrayBuffer = "assets/img/image.png";

  options_ubicacion = [
    {value: 1, label: 'Superior Izquierda'},
    {value: 2, label: 'Superio Centrado (Modo Membrete)'},
  ]

  public turnos: any = [];

  constructor(
    public sharedService: SharedService,
    public mantenimientoService: MantenimientoService,
    public notificationService: NotificationsService,
    public breadcrumbService: BreadcrumbsService,
    public router: Router,
) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.registro.id) {
      this.url_logo = this.registro.url_logo_pdf;
      this.logo_w = this.registro.logo_w;
      this.ubicacion_logo = this.registro.ubicacion_logo;
      this.footer = this.registro.footer;
      console.log(this.url_logo)
    }
  }

  onSubmit() {
    this.disabled = true;

    let data = {
        url_logo: this.url_logo,
        logo_w: this.logo_w,
        ubicacion_logo: this.ubicacion_logo,
        footer: this.footer,
    }

    this.sharedService.subirFormatoPDFSucursal(this.imagenSubir, data, this.registro.id, this.sharedService.organizacion_seleccionada.id).then(
        (response:any) => {
              this.disabled = false;
              this.url_logo = response.logotipo;
              this.submitChange.emit(true);
              this.notificationService.showInfo('Se editó el formato PDF de Sucursal' , 'Formato Actualizado');
            },
          err => {
            this.disabled = false;
            console.log(err);
          }
      );
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

  regresar(): void {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/sucursales/lista`;
    this.router.navigate([url]);
  }
}
