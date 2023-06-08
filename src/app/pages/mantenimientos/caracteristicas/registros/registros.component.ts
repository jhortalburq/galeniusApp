import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Opcion } from '../../../../interfaces/option';

import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { SharedService, MantenimientoService, EmpresaService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

import { Subject } from 'rxjs';
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {
  displayedColumns = [ 'Nombre', 'Abrev', 'Activo', ];

  content: any;
  action: Subject<any> = new Subject();

  @Input() registro;
  @Output() submitChange = new EventEmitter();

  registerForm: FormGroup;

  nombre: FormControl;
  abreviado: FormControl;

  public registros: any = [];

  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public empresaService: EmpresaService,
        private router: Router,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.getData();
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.abreviado = new FormControl('');
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre: this.nombre,
      abreviado: this.abreviado,
     });
  }

  getData() {
    this.mantenimientoService.getRegistrosCaracteristica(this.content.registro.id).subscribe(
      (response: any) => {
        this.registros = response;
      },
      (error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
  }

  setAbrv() {
      this.registerForm.patchValue({
        abreviado: this.registerForm.value.nombre.toUpperCase()
      })
  } 

  changeStatus(registro: any) {
      
    this.mantenimientoService.editObject('registros-caracteristicas', registro, registro.id ).subscribe(
         (response) => {

              if (registro.activo) {
                 this.notificationService.showInfo('Estado Activo', registro.nombre)
               } else {
                 this.notificationService.showInfo('Estado Inactivo', registro.nombre)
               }
           },
           err => {
                 console.log(err);
           }
       );

 }

  onSubmit() {
    if (this.registerForm.valid) {
        this.mantenimientoService.addRegistroCaracteristica(this.registerForm.value, this.content.registro.id ).subscribe(
          (response) => {
              this.registerForm.patchValue({
                abreviado: '',
                nombre: ''
              })

              this.getData();

          },
            err => {
                  console.log(err);
                  this.notificationService.showError(JSON.stringify(err.error), '');

            }
        );
    }
  }

}

