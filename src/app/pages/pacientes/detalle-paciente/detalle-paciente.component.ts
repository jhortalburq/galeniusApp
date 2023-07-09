import { Component } from '@angular/core';

import { BreadcrumbsService, 
  MantenimientoService, 
  PacientesService,
  SharedService,
  AlertService
} from '../../../services/services.index';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.scss']
})
export class DetallePacienteComponent {
  registro: any = {};
  slug: any;

  disabled: boolean = false;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public pacienteService: PacientesService,
    public sharedService: SharedService,
    public alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.breadcrumbService.title = 'EDITAR PACIENTE';
    this.getRegistro();
  }

  onSubmitDatosPersonales(registro: any) {
      this.disabled = true;
      window.scroll(0,0);

      this.pacienteService.editPaciente(registro, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.registro.slug)
                          .subscribe({
                                      next: (res: any) => {
                                        this.disabled = false;
                                        this.alertService.successSwalToast('Paciente Editado', 2000);
                                      },
                                      error: (err: any) => {
                                        console.log('error')
                                        this.disabled = false;
                                      }
                                    })
  }

  onSubmitDatosLaborales(registro: any) {
    this.disabled = true;
    window.scroll(0,0);

    if (registro.info) {
      this.pacienteService.updateinfoLaboralPaciente(registro, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                .subscribe({
                    next: (res: any) => {
                      this.disabled = false;
                      this.alertService.successSwalToast('Información Laboral Actualizada', 2000);
                    },
                    error: (err: any) => {
                      console.log('error')
                      this.disabled = false;
                    }
                })
    } else {
      registro['paciente'] = this.registro.id
      this.pacienteService.infoLaboralPaciente(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, registro)
              .subscribe({
                  next: (res: any) => {
                    this.disabled = false;
                    this.alertService.successSwalToast('Información Laboral Actualizada', 2000);
                  },
                  error: (err: any) => {
                    console.log('error')
                    this.disabled = false;
                  }
              })
    }
  }

  onSubmitDatosBiometricos(registro: any) {
    if (registro.changeImage || registro.changeFirma || registro.changeHuella) {
      this.disabled = true;
      window.scroll(0,0);

      this.pacienteService.datosBiometricosPaciente(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.registro.slug, registro)
                                            .then((response: any) => {
                                                 this.alertService.successSwalToast('Datos Biométricos Actualziadas', 2000);
                                                 this.disabled = false;
                                                 this.registro.imagen = response.imagen;
                                            });
    } else {
      this.alertService.warningSwalToast('No se modificó la información', 2000);
    }
  }

  getRegistro() {
    this.pacienteService.getPaciente(this.slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
    .subscribe({                                                                        
      next: (res: any) => {
        this.registro = res;
      }
    })
  }
}
