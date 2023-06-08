import { Component, OnInit } from '@angular/core';
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

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications.service';


@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrls: ['./agregar-sucursal.component.scss']
})

export class AgregarSucursalComponent implements OnInit {

  optionsSelect = [
    { value: 1, label: 'VENTA RAPIDA' },
    { value: 2, label: 'COMERCIAL' }
  ];

  registerForm: FormGroup;
  nombre_sucursal: FormControl;
  abreviado: FormControl;
  telefono: FormControl;
  correo: FormControl;
  direccion: FormControl;
  locacion: FormControl;
  tipo_tienda: FormControl;
  almacen: FormControl;

  optionsAlmacenes: any = [];
  ubigeosOptions: Opcion[];
  filteredUbigeo: Observable<any[]>;

  action: Subject<any> = new Subject();

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
    this.nombre_sucursal = new FormControl('', Validators.required);
    this.almacen = new FormControl('', Validators.required);
    this.abreviado = new FormControl('');
    this.telefono = new FormControl('');
    this.correo = new FormControl('', Validators.email);
    this.direccion = new FormControl('');
    this.locacion = new FormControl('');
    this.tipo_tienda = new FormControl('', Validators.required);
  }

  updateOptionAlmacenes() {
    this.almacenService.getAlmacenesEmpresa(this.empresaService.empresa_seleccionada.id).subscribe((res: any) => {
        this.optionsAlmacenes = res
    })
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre_sucursal: this.nombre_sucursal,
      abreviado: this.abreviado,
      almacen: this.almacen,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      locacion: this.locacion,
      tipo_tienda: this.tipo_tienda
     });

  }

  onSubmit() {

    if (this.registerForm.valid && this.empresaService.empresa_seleccionada.id) {

        this.almacenService.addSucursal( this.registerForm.value, this.empresaService.empresa_seleccionada.id ).subscribe(
          (response) => {
              this.action.next( true );
              this.notificationService.showSuccess('Se creó el registro correctamente' , 'Sucursal');
              this.modalRef.hide();
            },
            err => {
                  console.log(err);
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

