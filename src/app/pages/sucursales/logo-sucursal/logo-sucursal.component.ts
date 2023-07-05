import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService, NotificationsService, MantenimientoService, BreadcrumbsService} from '../../../services/services.index';


@Component({
  selector: 'app-logo-sucursal',
  templateUrl: './logo-sucursal.component.html',
  styleUrls: ['./logo-sucursal.component.scss']
})
export class LogoSucursalComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  fileName: string = 'Sin archivo seleccionado';

  url_logo: string = '';
  disabled: boolean = false;

  imagenSubir: File;
  imageUrl: string | ArrayBuffer = "https://bulma.io/images/placeholders/480x480.png";

  constructor(
    public sharedService: SharedService,
    public mantenimientoService: MantenimientoService,
    public notificationService: NotificationsService,
    public breadcrumbService: BreadcrumbsService,
    public router: Router
) { }

  ngOnChanges() {
    this.url_logo = this.registro.url_logo;
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
    this.disabled = true;
    this.imagenSubir = imagen;
    const reader = new FileReader();
    reader.readAsDataURL( imagen );
    reader.onloadend = () => this.imageUrl = reader.result;
  };

  cambiarImagen () {
      this.disabled = false;
      this.sharedService.subirLogotipoSucursal(this.imagenSubir, this.registro.id, this.sharedService.organizacion_seleccionada.id).then(
          (response:any) => {
                this.registro.url_logo = response.logotipo;
                this.submitChange.emit(true);
                this.notificationService.showInfo('Se editó el Logotipo de la Empresa' , 'Logo Actualizado');
                this.sharedService.sucursal_seleccionada.logo = response.logotipo; 
              },
            err => {
              this.disabled = true;
              console.log(err);
            }
        );
  };

  regresar(): void {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/sucursales/lista`;
    this.router.navigate([url]);
  }
}