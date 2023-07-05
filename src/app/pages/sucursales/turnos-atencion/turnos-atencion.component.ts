import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService, NotificationsService, MantenimientoService, BreadcrumbsService} from '../../../services/services.index';

import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-turnos-atencion',
  templateUrl: './turnos-atencion.component.html',
  styleUrls: ['./turnos-atencion.component.scss']
})
export class TurnosAtencionComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  disabled: boolean = false;

  registerForm: FormGroup;

  nombre: FormControl;
  dias: FormControl;
  hora_inicio: FormControl;
  hora_fin: FormControl;

  _diasList: Array <any> = [
    {value: 1, name: 'Lunes'},
    {value: 2, name: 'Martes'},
    {value: 3, name: 'Miércoles'},
    {value: 4, name: 'Jueves'},
    {value: 5, name: 'Viernes'},
    {value: 6, name: 'Sábado'},
    {value: 7, name: 'Domingo'},
  ]

  public turnos: any = [];

  constructor(
    public sharedService: SharedService,
    public mantenimientoService: MantenimientoService,
    public notificationService: NotificationsService,
    public breadcrumbService: BreadcrumbsService,
) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  ngOnChanges() {
    if (this.registro.id) {
      this.getTurnos();
    }
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.dias = new FormControl('', Validators.required);
    this.hora_inicio = new FormControl('', Validators.required);
    this.hora_fin = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre: this.nombre,
      dias: this.dias,
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
     });
  }

  getTurnos() {
    this.mantenimientoService.getTurnosAtencion(this.registro.id, this.sharedService.organizacion_seleccionada.id)
    .subscribe({
        next: (res: any) => {
          this.turnos = res.results;
          console.log(this.turnos)
        },
        error: (err: any) => console.log(err)
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.mantenimientoService.setTurnoAtencion(this.registerForm.value, this.registro.id, this.sharedService.organizacion_seleccionada.id)
                                .subscribe({
                                    next: (res: any) => {
                                      this.notificationService.showInfo('Se registró el turno correctamente' , this.registerForm.value.nombre);
                                      this.submitChange.emit(true);
                                      this.registerForm.reset();
                                    },
                                    error: (err: any) => console.log(err)
                                })
    }
  }
}
