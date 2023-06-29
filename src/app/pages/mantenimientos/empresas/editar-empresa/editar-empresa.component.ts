import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../../interfaces/option';

import { SharedService, EmpresaService } from '../../../../services/services.index';
import { NotificationsService } from '../../../../services/notifications.service';


@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})

export class EditarEmpresaComponent implements OnInit {

  @Input() empresa;
  @Output() submitChange = new EventEmitter();

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
  intentos: number;

  ubigeosOptions: Opcion[];
  filteredUbigeo: Observable<any[]>;
  loading: boolean;

  constructor(
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
    this.razon_social = new FormControl(this.empresa.razon_social, Validators.required);
    this.nombre_comercial = new FormControl(this.empresa.nombre_comercial);
    this.no_documento = new FormControl(this.empresa.no_documento, [
                                             Validators.required,
                                             Validators.maxLength(11),
                                             Validators.minLength(11),
                                             Validators.pattern('[0-9 ]*')
                                            ]);
    this.telefono = new FormControl(this.empresa.telefono);
    this.correo = new FormControl(this.empresa.correo, Validators.email);
    this.direccion = new FormControl(this.empresa.direccion);
    this.locacion = new FormControl(this.empresa.nombre_locacion);
    this.predeterminado = new FormControl(this.empresa.predeterminado);
    this.test = new FormControl(this.empresa.test);
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

  onSubmit(){

    if (this.registerForm.valid) {

        this.empresaService.editEmpresa( this.registerForm.value, this.empresa.id ).subscribe(
          (response) => {
              this.submitChange.emit(true);
              this.notificationService.showInfo('Se editó el registro correctamente' , 'Empresa');
            },
            err => {
                  console.log(err);
              this.submitChange.emit(false);
            }
        );

    }
  }

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
