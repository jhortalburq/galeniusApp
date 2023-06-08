import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../../interfaces/option';

import { SharedService, AlmacenService, EmpresaService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar-sucursal.component.html',
  styleUrls: ['./editar-sucursal.component.scss']
})

export class EditarSucursalComponent implements OnInit {
  @Input() sucursal;
  @Output() submitChange = new EventEmitter();

  registerForm: FormGroup;

  optionsSelect = [
    { value: 1, label: 'VENTA RAPIDA' },
    { value: 2, label: 'COMERCIAL' }
  ];

  nombre_sucursal: FormControl;
  abreviado: FormControl;
  telefono: FormControl;
  correo: FormControl;
  direccion: FormControl;
  locacion: FormControl;
  tipo_tienda: FormControl;
  almacen: FormControl;

  ubigeosOptions: Opcion[];
  filteredUbigeo: Observable<any[]>;
  optionsAlmacenes: any = [];

  content: any;

  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public empresaService: EmpresaService,
        public almacenService: AlmacenService,
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.updateOptionAlmacenes();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre_sucursal = new FormControl(this.sucursal.nombre_sucursal, Validators.required);
    this.abreviado = new FormControl(this.sucursal.abreviado);
    this.telefono = new FormControl(this.sucursal.telefono);
    this.correo = new FormControl(this.sucursal.correo, Validators.email);
    this.direccion = new FormControl(this.sucursal.direccion);
    this.locacion = new FormControl(this.sucursal.nombre_locacion);
    this.tipo_tienda = new FormControl(this.sucursal.tipo_tienda, Validators.required);
    this.almacen = new FormControl(this.sucursal.almacen, Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre_sucursal: this.nombre_sucursal,
      abreviado: this.abreviado,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      locacion: this.locacion,
      tipo_tienda: this.tipo_tienda,
      almacen: this.almacen,
     });

  }

  updateOptionAlmacenes() {
    this.almacenService.getAlmacenesEmpresa(this.empresaService.empresa_seleccionada.id).subscribe((res: any) => {
        this.optionsAlmacenes = res
    })
  }

  onSubmit(){

    if (this.registerForm.valid && this.empresaService.empresa_seleccionada.id) {

        this.almacenService.editSucursal( this.registerForm.value, this.sucursal.id, this.empresaService.empresa_seleccionada.id ).subscribe(
          (response) => {
                this.submitChange.emit(true);
                this.notificationService.showSuccess('Se editó el resitro correctamente' , 'Sucursal');
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
}
