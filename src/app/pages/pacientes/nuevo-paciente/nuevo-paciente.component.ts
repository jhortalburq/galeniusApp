import { Component, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MdbStepperComponent} from '../../../../../ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';

import { BreadcrumbsService, 
        MantenimientoService, 
        PacientesService,
        SharedService,
        AlertService
} from '../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';


@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.scss'],
})
export class NuevoPacienteComponent {
  @ViewChild('stepper', { static: true }) stepper: MdbStepperComponent

  disabled: boolean = false;

  data: any = [];

  lastStep: boolean = false;
  modalRef: MDBModalRef;

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public pacienteService: PacientesService,
      public sharedService: SharedService,
      public alertService: AlertService,
      private modalService: MDBModalService,
      private renderer: Renderer2,
      private router: Router
  ) { 
    this.breadcrumbService.title = 'NUEVO PACIENTE';
  }

  async ngOnInit() {
  }


  onSubmit() {
    // if (this.registerForm.valid) {
      // this.disabled = true;
      // window.scroll(0,0);

      // this.pacienteService.addPaciente(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
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
    // }
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
      this.lastStep = false;
    }

  finishStep() {
    window.scroll(0,0);
    this.lastStep = true;
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
