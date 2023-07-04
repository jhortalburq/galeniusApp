import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    FormGroup,
    FormControl,
    Validators,
    FormArray
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../interfaces/option';

import { SharedService, NotificationsService, MantenimientoService, BreadcrumbsService} from '../../../services/services.index';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar-sucursal.component.html',
  styleUrls: ['./editar-sucursal.component.scss']
})

export class EditarSucursalComponent implements OnInit {
  @Input() sucursal_id;
  @Output() submitChange = new EventEmitter();

  registro: any = {};
  disabled: boolean = false;

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
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService,
        public breadcrumbService: BreadcrumbsService,
        public router: Router
  ) { }

  ngOnInit(): void {
    this.getModulos();
    this.createFormControls();
    this.createForm();
    this.getRegistro();
    console.log(this.sucursal_id)
  }

  getRegistro() {
    this.mantenimientoService.getSucursal(this.sucursal_id, this.sharedService.organizacion_seleccionada.id)
    .subscribe({                                                                        
      next: (res: any) => {
        this.registro = res;
        this.registerForm.patchValue({                                
          ruc: this.registro.ruc,
          razon_social: this.registro.razon_social,
          clave: this.registro.clave,
          nombre_comercial: this.registro.nombre_comercial,
          organizacion_id: this.sharedService.organizacion_seleccionada.id,
          direccion: this.registro.direccion,
          locacion: this.registro.nombre_locacion,
        })
      }
    })
  }

  createFormControls() {
    this.razon_social = new FormControl(this.registro.razon_social, Validators.required);
    this.nombre_comercial = new FormControl(this.registro.nombre_comercial);
    this.ruc = new FormControl(this.registro.ruc, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
    this.clave = new FormControl(this.registro.clave, Validators.required);
    this.organizacion_id = new FormControl('', Validators.required);
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

  getModulos() {
    this.sharedService.modulosOrganizacion(this.sharedService.organizacion_seleccionada.id).subscribe((response: any) => {
      this._modulos = response;
      console.log(this._modulos)
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

    if (this.registerForm.valid) {
      this.disabled = true;

        this.sharedService.editSucursal( this.registerForm.value, this.sucursal_id, this.sharedService.organizacion_seleccionada.id ).subscribe({
          next: (response: any) => {
            this.disabled = false;
            this.notificationService.showInfo('Se editó el registro correctamente' , this.registro.razon_social);
          },
          error: (err: any) =>{
            this.disabled = false;
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

  regresar(): void {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/sucursales/lista`;
    this.router.navigate([url]);
  }
}
