import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormArray
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../interfaces/option';

import { SharedService, NotificationsService, MantenimientoService} from '../../../services/services.index';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar-sucursal.component.html',
  styleUrls: ['./editar-sucursal.component.scss']
})

export class EditarSucursalComponent implements OnInit {
  @Input() sucursal;
  @Output() submitChange = new EventEmitter();
  @Input() empresa_id: number;

  registerForm: FormGroup;

  razon_social: FormControl;
  nombre_comercial: FormControl;
  ruc: FormControl;
  direccion: FormControl;
  correo: FormControl;
  telefono: FormControl;
  clave: FormControl;
  locacion: FormControl;
  organizacion_id: FormControl;

  modulos_id: FormArray;

  ubigeosOptions: Opcion[];
  filteredUbigeo: Observable<any[]>;

  action: Subject<any> = new Subject();

  _modulos: any = [];

  constructor(
        public modalRef: MDBModalRef,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.getModulos();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.razon_social = new FormControl(this.sucursal.razon_social, Validators.required);
    this.nombre_comercial = new FormControl(this.sucursal.nombre_comercial);
    this.ruc = new FormControl(this.ruc, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
    this.clave = new FormControl(this.clave, Validators.required);
    this.organizacion_id = new FormControl(this.empresa_id, Validators.required);
    this.correo = new FormControl(this.correo);
    this.telefono = new FormControl(this.telefono);
    this.direccion = new FormControl(this.direccion);
    this.locacion = new FormControl(this.locacion);
    this.modulos_id = new FormArray([]);
  }

  createForm() {
     this.registerForm = new FormGroup({
      razon_social: this.razon_social,
      nombre_comercial: this.nombre_comercial,
      ruc: this.ruc,
      clave: this.clave,
      telefono: this.telefono,
      correo: this.correo,
      locacion: this.locacion,
      direccion: this.direccion,
      organizacion_id: this.organizacion_id,
      modulos_id: this.modulos_id
     });

  }

  getModulos() {
    this.mantenimientoService.getDataModulos().subscribe((response: any) => {
      this._modulos = response.results;
    });
  }

  changeCheckbox(item: any) {
    if (item.boolean) {
      this.modulos_id.push(new FormControl(item.id))
    } else {
      let i: number = 0;
      this.modulos_id.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == item.id) {
          this.modulos_id.removeAt(i);
          return;
        }
        i++;
      });  
    }
  }

  onSubmit(){

    if (this.registerForm.valid && this.empresa_id) {

        this.sharedService.editSucursal( this.registerForm.value, this.sucursal.id, this.empresa_id ).subscribe({
          next: (response: any) => {
            this.action.next( true );
            this.notificationService.showInfo('Se editó el registro correctamente' , 'Sucursal');
            this.modalRef.hide();
          },
          error: (err: any) =>{
            console.log(err);
          }
        })

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
