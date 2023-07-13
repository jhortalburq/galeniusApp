import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { 
  BreadcrumbsService, 
  MantenimientoService, 
  HorariosService, 
  SharedService, 
  AlertService,
} from '../../../../services/services.index';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-ingresar-horario',
  templateUrl: './ingresar-horario.component.html',
  styleUrls: ['./ingresar-horario.component.scss']
})
export class IngresarHorarioComponent {
  @Input('changeDate') changeDate: string;
  @Input('especialidad_id') especialidad_id: number;
  @Input('especialista_id') especialista_id: number;

  @Output() changeDateCalendar = new EventEmitter<string>();
  @Output() submitHorario = new EventEmitter<boolean>();

  registerForm: FormGroup;
  horario_inicio: FormControl;
  horario_fin: FormControl;
  dias: FormControl;
  fecha_limit: FormControl;
  especialista: FormControl;
  especialidad: FormControl;
  fecha: FormControl;

  repetitivo: FormControl;

  disabled: boolean = false;

  _diasList: Array <any> = [
    {value: 1, name: 'Lunes'},
    {value: 2, name: 'Martes'},
    {value: 3, name: 'Miércoles'},
    {value: 4, name: 'Jueves'},
    {value: 5, name: 'Viernes'},
    {value: 6, name: 'Sábado'},
    {value: 7, name: 'Domingo'},
  ]

  consultorioOptions: Array <any> = [
    {value: 1, name: 'Consultorio 01'},
    {value: 2, name: 'Consultorio 02'},
  ]

  is_repetivo: boolean = false;


  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
              public alertService: AlertService,
              public sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  changeDateEmit(value: any) {
    this.changeDateCalendar.emit(value);
  }

  createFormControls() {
    this.horario_inicio = new FormControl('', Validators.required);
    this.horario_fin = new FormControl('', Validators.required);
    this.dias = new FormControl('');
    this.fecha_limit = new FormControl('');
    this.especialista = new FormControl('');
    this.especialidad = new FormControl('');
    this.repetitivo = new FormControl(false);
    this.fecha = new FormControl('');
  }

  createForm() {
     this.registerForm = new FormGroup({
        horario_inicio: this.horario_inicio,
        horario_fin: this.horario_fin,
        fecha_limit: this.fecha_limit,
        dias: this.dias,
        especialidad: this.especialidad,
        especialista: this.especialista,
        repetitivo: this.repetitivo,
        fecha: this.fecha,
     });
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.registerForm.patchValue({
        especialidad: this.especialidad_id,
        especialista: this.especialista_id,
        fecha: this.changeDate,
      })

      this.horariosService.setHorarioEspecialista(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe({
                            next: (res: any) => {
                              this.disabled = false;
                              this.alertService.successSwalToast('Horario Registrado', 2000);
                              this.submitHorario.emit(true);
                              this.registerForm.reset();
                              this.is_repetivo = false;
                            },
                            error: (err: any) => {
                              console.log(err);
                              this.submitHorario.emit(false);
                              this.disabled = false;
                            }
                          })

    }
  }

  updateRepetitivo() {
    this.is_repetivo = !this.is_repetivo;

    this.registerForm.patchValue({
      fecha_limit: '',
      dias: '',
    })
  }
}
