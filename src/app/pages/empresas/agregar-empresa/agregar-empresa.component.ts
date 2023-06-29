import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../interfaces/option';

import { SharedService, EmpresaService } from '../../../services/services.index';

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../services/notifications.service';


@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.scss']
})
export class AgregarEmpresaComponent implements OnInit {

  
  registerForm: FormGroup;

  razon_social: FormControl;
  nombre_comercial: FormControl;
  no_documento: FormControl;
  telefono: FormControl;
  correo: FormControl;
  direccion: FormControl;
  locacion: FormControl;
  predeterminado: FormControl;
  test: FormControl;

  ubigeosOptions: Opcion[];
  filteredUbigeo: Observable<any[]>;

  intentos: number;

  action: Subject<any> = new Subject();

  loading: boolean;

  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.intentos = 0;

  }

  createFormControls() {
    this.razon_social = new FormControl('', Validators.required);
    this.nombre_comercial = new FormControl('');
    this.no_documento = new FormControl('', [
                                             Validators.required,
                                             Validators.maxLength(11),
                                             Validators.minLength(11),
                                             Validators.pattern('[0-9 ]*')
                                            ]);
    this.telefono = new FormControl('');
    this.correo = new FormControl('', Validators.email);
    this.direccion = new FormControl('');
    this.locacion = new FormControl('');
    this.predeterminado = new FormControl(false);
    this.test = new FormControl(false);
  }

  createForm() {
     this.registerForm = new FormGroup({
      razon_social: this.razon_social,
      nombre_comercial: this.nombre_comercial,
      no_documento: this.no_documento,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      locacion: this.locacion,
      predeterminado: this.predeterminado,
      test: this.test
     });
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.empresaService.addEmpresa( this.registerForm.value ).subscribe(
          (response) => {
              this.action.next( true );
              this.notificationService.showInfo('Se creó el registro correctamente' , 'Empresa');
              this.modalRef.hide();
            },
            err => {
                  console.log(err);
                  this.notificationService.showError(JSON.stringify(err.error), '');

            }
        );

    }
  }

  // onDisplayValue(color: Color): string | undefined {
  //   console.log(color)
  //   return color ? color.name : undefined;
  // }

  buscarUbigeo(e){
     this.filteredUbigeo = this.sharedService.getOptionsUbigeo(e.target.value);
  }

  onKeydown(event) {
    if (event.key === "Backspace" || event.key === "Delete ") {
      this.registerForm.patchValue({
              locacion: "",
            });
    }
  }

  selectUbigeo(ubigeo: Opcion){
      this.registerForm.patchValue({
              locacion: ubigeo.nombre,
            });
  }

  onKeydownRUC(event) {
    this.intentos = 0;
    if (event.key === "Backspace" || event.key === "Delete ") {
        this.registerForm.patchValue({
            direccion: '',
            nombre_comercial: '',
            razon_social: '',
            locacion: ''
        });
    }
  }

  async searchRuc() {
    if (this.registerForm.value.no_documento.length === 11 && this.intentos < 6) {
          this.loading = true;
          await this.empresaService.getValidarDocumento(6, this.registerForm.value.no_documento).subscribe((response: any) => {

              if( response.razonSocial ) {

                if (response.departamento) {
                  this.registerForm.patchValue({
                    direccion: response.direccion,
                    nombre_comercial: response.nombreComercial,
                    razon_social: response.razonSocial,
                    locacion: `${response.departamento}/${response.provincia}/${response.distrito}`
                  });
                } else {
                  this.registerForm.patchValue({
                    direccion: response.direccion,
                    nombre_comercial: response.nombreComercial,
                    razon_social: response.razonSocial,
                  });
                }

                this.intentos = 0;
                this.loading = false;
              } else {

                 this.registerForm.patchValue({
                  direccion: '',
                  nombre_comercial: '',
                  razon_social: '',
                  locacion: ''
                });

                this.intentos += 1;
                this.loading = true;
                this.searchRuc();
              }
          });
    } else {
      this.loading = false;
    }
  }
}
