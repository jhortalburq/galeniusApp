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
  selector: 'app-ingresar-pago',
  templateUrl: './ingresar-pago.component.html',
  styleUrls: ['./ingresar-pago.component.scss']
})
export class IngresarPagoComponent {
  @Input() cita_id;

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
}
