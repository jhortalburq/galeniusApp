import { Component, OnInit,  Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import { BreadcrumbsService, MantenimientoService, HorariosService, SharedService, AlertService } from '../../../../services/services.index';

import {
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';

import { NuevaCitaComponent } from '../../citas/nueva-cita/nueva-cita.component';

@Component({
  selector: 'app-agenda-diaria',
  templateUrl: './agenda-diaria.component.html',
  styleUrls: ['./agenda-diaria.component.scss'],
})
export class AgendaDiariaComponent implements OnInit {
 
  selected = new Date();
  changeDate: string = '';
  modalRef: MDBModalRef;

  registerForm: FormGroup;
  especialista: FormControl;
  especialidad: FormControl;

  especialidad_id: number = 0;
  especialista_id: number = 0;

  especialidades: any = [];
  especialistas: any = [];
  fecha: string = '';

  events: any = [];

  add_cita: boolean = false;

  isCollapsed: boolean = false;
  
  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
              private modalService: MDBModalService,
              private renderer: Renderer2,
              public sharedService: SharedService,
              public alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.breadcrumbService.title = 'AGENDA DE CITAS';
    this.getEspecialidades();
    this.createFormControls();
    this.createForm();
    this.changeDate = this.selected.toISOString();

  }

  createFormControls() {
    this.especialidad = new FormControl('', Validators.required);
    this.especialista = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      especialista: this.especialista,
      especialidad: this.especialidad,
     });
  }

  getEspecialidades() {
    this.mantenimientoService.getEspecialidades(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                             .subscribe((response: any) => {
                                 this.especialidades = response.results;
                              });
  }

  getEspecialistas(especialidad: number) {
    this.mantenimientoService.getEspecialistas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, especialidad)
                             .subscribe((response: any) => {
                                this.especialistas = response;
                              });
  }

  onSelectEspecialidad(item: any) {
    this.especialista_id = 0;

    this.registerForm.patchValue({
        especialista: 0,
    });

    this.add_cita = false;

    this.especialidad_id = item.value;
    this.getEspecialistas(item.value);
  }

  onSelectEspecialista(item: any) {
    this.especialista_id = item.value;
  }

  onSelectDate(item: any) {
    this.changeDate = item.toISOString();
  }

  setNewDate(event: any) {
    this.selected = event;
  }

  setIngreso(success: any) {
    console.log(success)
  }

  closeHorario() {
    this.add_cita = false;
  }

  addCita() {
    if (!this.especialista_id) {
      this.alertService.warningSwal('Seleccione un Especialista', '')
      this.add_cita = false;
    } else {
      this.add_cita = true;
    }
  }
}
