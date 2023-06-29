import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BreadcrumbsService, MantenimientoService, HorariosService, SharedService } from '../../../services/services.index';

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

  registerForm: FormGroup;
  hora_inicio: FormControl;
  hora_fin: FormControl;
  dias: FormControl;
  fecha_limit: FormControl;
  consultorio: FormControl;

  repetitivo: FormControl;

  _diasList: Array <any> = [
    {value: 1, name: 'Lunes'},
    {value: 2, name: 'Martes'},
    {value: 3, name: 'Miercoles'},
    {value: 4, name: 'Jueves'},
    {value: 5, name: 'Viernes'},
    {value: 6, name: 'Sábado'},
    {value: 7, name: 'Domingo'},
  ]

  consultorioOptions: Array <any> = [
    {value: 1, name: 'Consultorio 01'},
    {value: 2, name: 'Consultorio 02'},
  ]

  disabled: boolean = false;
  is_repetivo: boolean = false;

  _horas: Array <any> = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ]

  _minutos: Array <any> = ['00', '30']

  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
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
    this.hora_inicio = new FormControl('', Validators.required);
    this.hora_fin = new FormControl('', Validators.required);
    this.dias = new FormControl('');
    this.fecha_limit = new FormControl('');
    this.repetitivo = new FormControl(false);
    this.consultorio = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
        hora_inicio: this.hora_inicio,
        hora_fin: this.hora_inicio,
        fecha_limit: this.fecha_limit,
        dias: this.dias,
        repetitivo: this.repetitivo,
        consultorio: this.consultorio,
     });
  }


  onSubmit() {
    if (this.registerForm.valid) {
    }
  }

  updateRepetitivo() {
    this.is_repetivo = !this.is_repetivo;
  }
}
