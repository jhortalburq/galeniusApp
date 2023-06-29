import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';
import Swal from 'sweetalert2';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


import { SharedService, UsuariosService } from '../../../services/services.index';

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../services/notifications.service';

import { MustMatch } from './must-match.validator';


@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.scss']
})
export class AgregarUsuariosComponent implements OnInit {

  registerForm: FormGroup;

  // first_name: FormControl;
  // last_name: FormControl;
  // email: FormControl;
  // is_superuser: FormControl;
  // password: FormControl;
  // password2: FormControl;

  action: Subject<any> = new Subject();


  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public usuarioService: UsuariosService,
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    // this.createFormControls();
    this.createForm();
  }

  // createFormControls() {
  //   this.first_name = new FormControl('', Validators.required);
  //   this.last_name = new FormControl('', Validators.required);
  //   this.email = new FormControl('', [Validators.required,
  //                                     Validators.email]);
  //   this.is_superuser = new FormControl(false);
  //   this.password = new FormControl('', Validators.required);
  //   this.password2 = new FormControl('', Validators.required);
  // }

  createForm() {
     this.registerForm = this.fb.group({
      first_name:  ['', Validators.required],
      last_name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      is_superuser: [false]
     }, {
          validator: MustMatch('password', 'confirmPassword')
      });
  }

  onSubmit() {

    if (this.registerForm.valid) {
        this.usuarioService.addUsuario( this.registerForm.value ).subscribe(
          (response) => {
              this.action.next( true );
              this.notificationService.showInfo('Se creó el registro correctamente' , 'Usuario');
              this.modalRef.hide();
            },
          (err: any) => {
                console.log(err.error);

                Swal.fire({
                      title: 'Error!',
                      text: err.error,
                      icon: 'error',
                      confirmButtonText: 'Cerrar'
                    });
            }
        );

    };
  }

}
