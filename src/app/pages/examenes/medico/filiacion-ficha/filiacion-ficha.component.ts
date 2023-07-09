import { Component, Input, Output, EventEmitter } from '@angular/core';

import { BreadcrumbsService, 
  MantenimientoService, 
  AdmisionService,
  SharedService,
  AlertService
} from '../../../../services/services.index';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filiacion-ficha',
  templateUrl: './filiacion-ficha.component.html',
  styleUrls: ['./filiacion-ficha.component.scss']
})
export class FiliacionFichaComponent {
  @Output() submitChange = new EventEmitter();
  @Input() orden_slug;

  registro: any = {};
  slug: any;

  disabled: boolean = false;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public admisionService: AdmisionService,
    public sharedService: SharedService,
    public alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.getRegistro();
  }

  onSubmitDatosPersonales(registro: any) {
    this.submitChange.emit(true);
  }

  onSubmitDatosBiometricos(registro: any) {
    if (registro.changeImage || registro.changeFirma || registro.changeHuella) {
      this.disabled = true;
      window.scroll(0,0);

      this.admisionService.datosBiometricosOrden(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.orden_slug, registro, 'oc')
                                            .then((response: any) => {
                                                 this.alertService.successSwalToast('Datos Biométricos Actualizadas', 2000);
                                                 this.disabled = false;
                                                 this.registro.imagen = response.imagen;
                                                 this.submitChange.emit(true);
                                                });
    } else {
      this.alertService.warningSwalToast('No se modificó la información', 2000);
    }
  }

  getRegistro() {
    this.admisionService.getInfoFiliacion(this.orden_slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
    .subscribe({                                                                        
      next: (res: any) => {
        this.registro = res;
        console.log(res)
      }
    })
  }
}
