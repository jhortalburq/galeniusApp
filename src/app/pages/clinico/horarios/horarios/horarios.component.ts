import { Component, OnInit,  Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, MantenimientoService, HorariosService, SharedService, AlertService } from '../../../../services/services.index';

import {
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent {
  add_horario: boolean = false;

  selected = new Date();
  changeDate: string = '';

  registerForm: FormGroup;
  especialista: FormControl;
  especialidad: FormControl;

  especialidad_id: number = 0;
  especialista_id: number = 0;

  especialidades: any = [];
  especialistas: any = [];
  fecha: string = '';

  events: any = [];

  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
              public sharedService: SharedService,
              public alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.breadcrumbService.title = 'HORARIOS POR ESPECIALISTAS';
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
    })
    this.add_horario = false;

    this.especialidad_id = item.value;
    this.getEspecialistas(item.value);
  }

  onSelectEspecialista(item: any) {
    this.especialista_id = item.value;
  }

  onSelectDate(item: any) {
    this.changeDate = item.toISOString();
  }

  addHorario() {
    if (!this.especialista_id) {
      this.alertService.warningSwal('Seleccione un Especialista', '')
      this.add_horario = false;
    } else {
      this.add_horario = true;
    }
  }

  closeHorario() {
    this.add_horario = false;
  }

  setNewDate(event: any) {
    this.selected = event;
  }

  setHorario(success: boolean) {
    console.log(success)
  }
}
