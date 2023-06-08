import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Opcion } from '../../../../interfaces/option';

import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { SharedService, MantenimientoService, EmpresaService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  content: any;
  action: Subject<any> = new Subject();

  @Input() cliente;
  @Output() submitChange = new EventEmitter();

  registerForm: FormGroup;

  tipo_documento: FormControl;
  razon_social: FormControl;
  no_documento: FormControl;
  telefono: FormControl;
  correo: FormControl;
  direccion: FormControl;
  locacion: FormControl;
  predeterminado: FormControl;
  test: FormControl;
  intentos: number;

  optionTipoDocumento: any;

  ubigeosOptions: Opcion[];
  filteredUbigeo: Observable<any[]>;
  loading: boolean;

  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public empresaService: EmpresaService,
        public notificationService: NotificationsService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.mantenimientoService.getOptionsField().subscribe(
      response => {
        this.optionTipoDocumento = response['tipo_documento']
      },
      err => {
              console.log(err);
      }
    );
    console.log(this.content)
    this.createFormControls();
    this.createForm();
    this.intentos = 0;

  }

  createFormControls() {
    this.razon_social = new FormControl(this.content.cliente.razon_social, Validators.required);
    this.tipo_documento = new FormControl(this.content.cliente.tipo_documento, Validators.required);
    this.no_documento = new FormControl(this.content.cliente.no_documento, [
                                             Validators.maxLength(11),
                                             Validators.minLength(8),
                                             Validators.pattern('[0-9 ]*')
                                            ]);
    this.telefono = new FormControl(this.content.cliente.telefono,);
    this.correo = new FormControl(this.content.cliente.correo, Validators.email);
    this.direccion = new FormControl(this.content.cliente.direccion);
    this.locacion = new FormControl(this.content.cliente.nombre_locacion);
  }

  createForm() {
     this.registerForm = new FormGroup({
      razon_social: this.razon_social,
      tipo_documento: this.tipo_documento,
      no_documento: this.no_documento,
      telefono: this.telefono,
      correo: this.correo,
      direccion: this.direccion,
      locacion: this.locacion,
     });
  }

  onEditEmpresa(submit: boolean) {
    if (submit) {
        this.action.next( true );
        this.modalRef.hide();
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

  onKeydownDocumento(event) {
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

  async searchDocumento() {
    if (this.registerForm.value.tipo_documento === '6') {
      if (this.registerForm.value.no_documento.length === 11 && this.intentos < 6) {
        this.loading = true;
        await this.empresaService.getValidarDocumento(6, this.registerForm.value.no_documento).subscribe((response: any) => {

          if (response.razonSocial) {

            this.registerForm.patchValue({
              direccion: response.direccion,
              nombre_comercial: response.nombreComercial,
              razon_social: response.razonSocial,
              locacion: `${response.departamento}/${response.provincia}/${response.distrito}`
            });

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
            this.searchDocumento();
          }
        });
      } else {
        this.loading = false;
      }
    } else if (this.registerForm.value.tipo_documento === '1') {
      if (this.registerForm.value.no_documento.length === 8 && this.intentos < 6) {
        this.loading = true;
        await this.empresaService.getValidarDocumento(1, this.registerForm.value.no_documento).subscribe((response: any) => {

          if (response.apellidoPaterno) {

            this.registerForm.patchValue({
              razon_social: `${response.nombres} ${response.apellidoPaterno} ${response.apellidoMaterno}`
            });

            this.intentos = 0;
            this.loading = false;
          } else {

            this.registerForm.patchValue({
              razon_social: '',
            });

            this.intentos += 1;
            this.loading = true;
            this.searchDocumento();
          }
        });
      } else {
        this.loading = false;
      }
    } else {
       this.loading = false;
    }
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.mantenimientoService.editObject('clientes', this.registerForm.value, this.content.cliente.id ).subscribe(
          (response) => {
            console.log(response);
              this.action.next( true );
              this.notificationService.showSuccess('Se editó el registro correctamente' , 'Cliente');
              this.modalRef.hide();
            },
            err => {
                  console.log(err);
                  this.notificationService.showError(JSON.stringify(err.error), '');

            }
        );

    }
  }

}
