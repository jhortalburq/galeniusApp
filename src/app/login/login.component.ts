import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/services.index';

import { AlertService } from '../services/alert.service';

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

  // public last_modulo: string | null = '';
  loginForm: FormGroup;

  constructor(
        public router: Router,
        public authService: AuthService,
        public fb: FormBuilder,
        public alertService: AlertService,
  ) { }

  ngOnInit() {
    // this.last_modulo = localStorage.getItem('last_modulo');
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

        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                // if (this.last_modulo) {
                //     url = this.router.navigate(['/' + this.last_modulo, 'menu']);
                // } else {
                // }
                this.alertService.successSwalToast('Ingreso Correcto', 2000);

                setTimeout(() => {
                    this.router.navigate(['/menu']);
                }, 500)
            },
            error: (e: any) => {
                this.loginForm.reset();
                this.alertService.errorSwal(e.error.detail, 'Error');
            }
        })

    }
  }
}

