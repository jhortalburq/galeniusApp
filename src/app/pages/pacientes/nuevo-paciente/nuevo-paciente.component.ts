import { Component, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MdbStepperComponent} from '../../../../../ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';

import { BreadcrumbsService, 
        MantenimientoService, 
        PacientesService,
        NotificationsService,
        SharedService,
        AlertService
} from '../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.scss'],
})
export class NuevoPacienteComponent {
  @ViewChild('stepper', { static: true }) stepper: MdbStepperComponent

  disabled: boolean = false;

  data: any = [];

  modalRef: MDBModalRef;

  infoPersonal: any = {};
  infoLaboral: any = {};
  infoBiometrico: any = {};

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public pacienteService: PacientesService,
      public sharedService: SharedService,
      public alertService: AlertService,
      private modalService: MDBModalService,
      public notificationService: NotificationsService,
      private renderer: Renderer2,
      private router: Router
  ) { 
    this.breadcrumbService.title = 'NUEVO PACIENTE';
  }

  async ngOnInit() {
  }


  async onSubmit() {

    this.disabled = true;
    window.scroll(0,0);

    const paciente$ = this.pacienteService.addPaciente(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.infoPersonal);
    let _paciente = await lastValueFrom(paciente$).catch((errors: any) => {
                                                    this.notificationService.showError('No se registro el paciente', 'Paciente');
                                                      return "an error has occured"
                                                  }).then(response => {
                                                    console.log("resp: ", response) 
                                                    return response
                                                  });

    if (this.infoLaboral.empresa) {
      this.infoLaboral['paciente'] = _paciente.id
      const infoLaboral$ = this.pacienteService.infoLaboralPaciente(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.infoLaboral);
      let _infoLaboral = await lastValueFrom(infoLaboral$).catch((error: any) => {
                                          console.log("error: ", error);
                                          this.notificationService.showError('Hubo un error al guardar los datos', 'Información Laboral');
                                          return "an error has occured"
                                        }).then(response => {
                                          console.log("resp: ", response)
                                        });
    }

    if (this.infoBiometrico.changeHuella || this.infoBiometrico.changeFirma || this.infoBiometrico.changeImage) {
      const datosBiometricos$ = await this.pacienteService.datosBiometricosPaciente(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, _paciente.slug, this.infoBiometrico);
      console.log('biometricos', datosBiometricos$)
    }

    setTimeout(() => {
      this.disabled = false;
      this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'pacientes', 'lista']);
    }, 500)

    // this.pacienteService.addPaciente(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.infoPersonal)
    //                     .subscribe({
    //                                 next: (res: any) => {
    //                                   this.alertService.successSwalToast('Paciente Registrado', 2000);

    //                                   setTimeout(() => {
    //                                     this.disabled = false;
    //                                     this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'pacientes', res.slug, 'editar']);
    //                                   }, 500)
    //                                 },
    //                                 error: (err: any) => {
    //                                   this.disabled = false;
    //                                   console.log('error')
    //                                 }
    //                               })
  }

  onSubmitDatosPersonales(registro: any) {
    this.infoPersonal = registro;
    this.nextStep();
  }

  onSubmitDatosLaborales(registro: any) {
    this.infoLaboral = registro;
    this.nextStep();
  }

  onSubmitDatosBiometricos(registro: any) {
    this.infoBiometrico = registro;
    this.finishStep();
  }

  regresarDatosLaborales() {
    this.previousStep();
  }

  regresarDatosBiometricos() {
    this.previousStep();
  }

  regresar() {
    let url = this.router.url;
    url = url.replace('nuevo', 'lista');
    this.router.navigate([url]);
  }

  nextStep() {
      window.scroll(0,0);
      this.stepper.next();
  }

  previousStep() {
      window.scroll(0,0);
      this.stepper.previous();
    }

  finishStep() {
    window.scroll(0,0);
    this.stepper.next();
    this.openModal();
  }

  openModal() {
    this.modalRef = this.modalService.show(ConfirmacionComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: true,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
                  data: {
                  }
              });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      console.log(result)
      if (result) {
        this.onSubmit();
      } else {
        this.previousStep();
      }
    });
  }


}
