import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
  SharedService,
  MantenimientoService,
  PacientesService,
  HorariosService
  
} from '../../../../services/services.index';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.scss']
})
export class NuevaCitaComponent implements OnInit {
  @Input() especialista_id;
  @Input() especialidad_id;

  maxResults = 10;

  registerForm: FormGroup;
  paciente: FormControl;
  especialidad: FormControl;
  especialista: FormControl;
  tipo_cita: FormControl;
  fecha: FormControl;
  horario: FormControl;

  action: Subject<any> = new Subject();

  especialidades: any = [];
  especialistas: any = [];

  horarios: any = [];


  choices_tipos_pacientes: any = [];
  choices_tipos_citas: any = [];

  constructor(
      public modalRef: MDBModalRef,
      public fb: FormBuilder,
      public mantenimientoService: MantenimientoService,
      public sharedService: SharedService,
      public horariosService: HorariosService,
      public pacientesService: PacientesService,
  ) { }

  ngOnInit(): void {
    this.getEspecialidades();
    this.getTipoCitas();
    this.getChoicesPacientes();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.paciente = new FormControl('', Validators.required);
    this.especialidad = new FormControl('', Validators.required);
    this.especialista = new FormControl('', Validators.required);
    this.tipo_cita = new FormControl('', Validators.required);
    this.fecha = new FormControl('', Validators.required);
    this.horario = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      paciente: this.paciente,
      especialidad: this.especialidad,
      especialista: this.especialista,
      fecha: this.fecha,
      tipo_cita: this.tipo_cita,
      horario: this.horario,
     });
  }

  onSubmit() {
  }

  getEspecialidades() {
    this.mantenimientoService.getEspecialidades(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                             .subscribe((response: any) => {
                              for (let i = 0; i < response.results.length; i++) {
                                  this.especialidades.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  getEspecialistas(especialidad: number) {
    this.mantenimientoService.getEspecialistas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, especialidad)
                             .subscribe((response: any) => {
                                    for (let i = 0; i < response.length; i++) {
                                      this.especialistas.push({value: response[i].id, label: response[i].especialista})
                                    }
                              });
  }


  _searchPaciente(item: any) {
    this.getChoicesPacientes(item.search)
  }

  _focusPaciente(item: any) {
    this.getChoicesPacientes()
  }
  
  getChoicesPacientes(params?: string) {
    return this.pacientesService.getPacientesForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params)
          .subscribe((response: any) => {
             this.choices_tipos_pacientes = response.results;
           });

  }

  selectEspecialidad(item: any) {
    if (item.value) {
      this.getEspecialistas(item.value);
    }
  }

  selectEspecialista(item: any) {
    if (item.value) {
        this.updateTurnos(this.registerForm.value.especialista, this.registerForm.value.fecha);
    }
  }

  selectDate(e: any) {
    this.updateTurnos(this.registerForm.value.especialista, this.registerForm.value.fecha);
  }

  updateTurnos(especialista, fecha) {
    if (fecha && especialista) {
      this.horariosService.getHorariosDisponiblesEspecialista(especialista, this.registerForm.value.especialidad, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, fecha)
      .subscribe({
          next: (res => this.horarios = res.results)
      })
    }
  }

  getTipoCitas() {
    this.mantenimientoService.getDataMantenimiento('tipos-citas', this.sharedService.organizacion_seleccionada.id).subscribe((response: any) => {
      for (let i = 0; i < response.results.length; i++) {
        this.choices_tipos_citas.push({value: response.results[i].id, label: response.results[i].nombre})
      }
    });
  }

  setHorario( horario_id: number ){
    this.registerForm.patchValue({
      horario: horario_id
    })
  }
}
