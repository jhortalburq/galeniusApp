import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

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
  registerForm: FormGroup;
  almacen: FormControl;
  abreviado: FormControl;
  codigo_almacen: FormControl;
  num_ingreso: FormControl;
  direccion: FormControl;
  num_salida: FormControl;
  responsable: FormControl;

  action: Subject<any> = new Subject();

  constructor(
      public modalRef: MDBModalRef,
      public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.almacen = new FormControl('', Validators.required);
    this.abreviado = new FormControl('');
    this.codigo_almacen = new FormControl('');
    this.num_ingreso = new FormControl(0);
    this.direccion = new FormControl('');
    this.num_salida = new FormControl(0);
    this.responsable = new FormControl('');
  }

  createForm() {
     this.registerForm = new FormGroup({
      almacen: this.almacen,
      abreviado: this.abreviado,
      direccion: this.direccion,
      codigo_almacen: this.codigo_almacen,
      num_ingreso: this.num_ingreso,
      num_salida: this.num_salida,
      responsable: this.responsable
     });
  }

  onSubmit() {
  }

}
