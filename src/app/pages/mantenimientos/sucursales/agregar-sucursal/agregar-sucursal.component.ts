import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormArray
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../../interfaces/option';

import { SharedService, EmpresaService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrls: ['./agregar-sucursal.component.scss']
})

export class AgregarSucursalComponent implements OnInit {
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
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.getModulos();
  }

  createFormControls() {
    this.razon_social = new FormControl('', Validators.required);
    this.nombre_comercial = new FormControl('');
    this.ruc = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
    this.clave = new FormControl('', Validators.required);
    this.organizacion_id = new FormControl(this.empresa_id, Validators.required);
    this.correo = new FormControl('');
    this.telefono = new FormControl('');
    this.direccion = new FormControl('');
    this.locacion = new FormControl('');
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

  onSubmit() {

    if (this.registerForm.valid && this.empresa_id) {

        this.empresaService.addSucursal(this.registerForm.value, this.empresa_id).subscribe({
          next: (response: any) => {
            this.action.next( true );
            this.notificationService.showSuccess('Se creó el registro correctamente' , 'Sucursal');
            this.modalRef.hide();
          },
          error: (err: any) =>{
            console.log(err);
          }
        })
      }
  }
      
  getModulos() {
    this.mantenimientoService.getDataModulos().subscribe((response: any) => {
      this._modulos = response.results;
    });
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

