import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  SharedService,
  MantenimientoService,
  PacientesService,
  HorariosService,
  AlertService,
  CitasService,
} from '../../../../services/services.index';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import Swal from 'sweetalert2';


import { Subject } from 'rxjs';
@Component({
  selector: 'app-nuevo-ingreso',
  templateUrl: './nuevo-ingreso.component.html',
  styleUrls: ['./nuevo-ingreso.component.scss']
})
export class NuevoIngresoComponent {
  @Input('changeDate') changeDate: string;
  @Input('especialidad_id') especialidad_id: number;
  @Input('especialista_id') especialista_id: number;

  @Output() submitCita = new EventEmitter<any>();

  maxResults = 10;
  disabled: boolean = false;

  registerForm: FormGroup;
  paciente: FormControl;
  especialidad: FormControl;
  especialista: FormControl;
  tipo_cita: FormControl;
  horario: FormControl;
  motivo: FormControl;

  action: Subject<any> = new Subject();

  especialidades: any = [];
  especialistas: any = [];

  horarios: any = [];

  choices_tipos_pacientes: any = [];
  choices_tipos_citas: any = [];

  constructor(
      public fb: FormBuilder,
      public mantenimientoService: MantenimientoService,
      public sharedService: SharedService,
      public horariosService: HorariosService,
      public pacientesService: PacientesService,
      public citasService: CitasService,
      public alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getTipoCitas();
    this.getTurnosDisponibles();
    this.getChoicesPacientes();
    this.createFormControls();
    this.createForm();
  }

  ngOnChanges(){
    this.getTurnosDisponibles();
  }

  createFormControls() {
    this.paciente = new FormControl('', Validators.required);
    this.especialidad = new FormControl('', Validators.required);
    this.especialista = new FormControl('', Validators.required);
    this.tipo_cita = new FormControl('', Validators.required);
    this.horario = new FormControl('', Validators.required);
    this.motivo = new FormControl('');
  }

  createForm() {
     this.registerForm = new FormGroup({
      paciente: this.paciente,
      especialidad: this.especialidad,
      especialista: this.especialista,
      tipo_cita: this.tipo_cita,
      horario: this.horario,
      motivo: this.motivo,
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
             console.log(this.choices_tipos_pacientes)
           });
  }

  getTurnosDisponibles() {
      this.horariosService.getHorariosDisponiblesEspecialista(this.especialista_id, this.especialidad_id, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.changeDate.split('T')[0])
      .subscribe({
          next: (res => {
            this.horarios = res.results.map( (item: any) => {
                return {...item, select: false}
            })
          })
      })
  }

  getTipoCitas() {
    this.mantenimientoService.getDataMantenimiento('tipos-citas', this.sharedService.organizacion_seleccionada.id).subscribe((response: any) => {
      for (let i = 0; i < response.results.length; i++) {
        this.choices_tipos_citas.push({value: response.results[i].id, label: response.results[i].nombre})
      }
    });
  }

  setHorario( horario_id: number ){
    this.horarios = this.horarios.map( (item: any) => {
      if (item.id == horario_id) {
        return {...item, select: true}
      } else {
        return {...item, select: false}
      }
    })
  
    this.registerForm.patchValue({
      horario: horario_id,
      especialidad: this.especialidad_id,
      especialista: this.especialista_id,
    })
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.citasService.addCitaPaciente(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe({
                            next: (res: any) => {
                              this.disabled = false;
                              Swal.fire({
                                title: 'Cita Agendada',
                                text: "Registar pago de la cita",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, Pagar',
                                cancelButtonText: 'No'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  this.alertService.successSwalToast('Cita Registrada', 2000);
                                  this.submitCita.emit({cita: res.cita_id, pagar: true});
                                } else {
                                  this.alertService.successSwalToast('Cita Registrada', 2000);
                                  this.submitCita.emit({cita: res.cita_id, pagar: false});
                                }
                              })
                              this.registerForm.reset();
                            },
                            error: (err: any) => {
                              console.log(err);
                              this.submitCita.emit({cita: false, pagar: false});
                              this.disabled = false;
                            }
                          })

    }
  }

}
