import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/services.index';
import Swal from 'sweetalert2';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public last_modulo: string | null = '';
  loginForm: FormGroup;

  constructor(
        public router: Router,
        public authService: AuthService,
        public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.last_modulo = localStorage.getItem('last_modulo');
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
        username:  ['', Validators.required],
        password:  ['', Validators.required],
      });
  }

  onSubmit() {

    if (this.loginForm.valid) {

        this.authService.login( this.loginForm.value ).subscribe(
          (response) => {

              let timerInterval;

              Swal.fire({
                title: 'Ingreso Correcto',
                text: 'Espere unos segundos estamos redirigiendolo al ingreso',
                icon: 'success',
                // onClose: () => {
                //   clearInterval(timerInterval);
                //      if (this.last_modulo) {
                //         this.router.navigate(['/' + this.last_modulo, 'menu']);
                //     } else {
                //         this.router.navigate(['/menu']);
                //     }
                // }
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              });
            },
            err => {
                Swal.fire({
                  title: 'Error!',
                  text: 'El usuario o contraseña ingresada es incorrecta',
                  icon: 'error',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: "#59698d",
                });
                  // swal("Login Incorrecto!", err.error.non_field_errors[0], "error");
            }
        );
    }
  }
}
