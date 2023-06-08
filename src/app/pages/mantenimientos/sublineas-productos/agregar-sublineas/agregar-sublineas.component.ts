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

import { SharedService, MantenimientoService, EmpresaService } from '../../../../services/services.index';

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-agregar-sublineas',
  templateUrl: './agregar-sublineas.component.html',
  styleUrls: ['./agregar-sublineas.component.scss']
})
export class AgregarSublineasComponent implements OnInit {

  registerForm: FormGroup;

  nombre: FormControl;
  prefijo: FormControl;
  familia: FormControl;
  linea: FormControl;

  familiaOptions: any = [{value: '', label: '-----------'}];
  lineaOptions: any = [{value: '', label: '-----------'}];

  action: Subject<any> = new Subject();

  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public empresaService: EmpresaService,
        public notificationService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.opcionesFamiliaProductos();
    // this.opcionesLineaProductos();
    this.createFormControls();
    this.createForm();

  }

  opcionesFamiliaProductos(){
    this.mantenimientoService.getQueryset('familias-productos').subscribe( (res: any) => {

        this.familiaOptions = res.results;
    });
 }

 seleccionarFamilia(e: any) {
    this.opcionesLineaProductos(e.id);
 }

  opcionesLineaProductos(idFamilia: number){
    this.mantenimientoService.getFamiliaLineasProducto(idFamilia).subscribe( (res: any) => {
        this.lineaOptions = [{value: '', label: '-----------'}].concat(res.results);
    });
 }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.prefijo = new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]);
    this.familia = new FormControl('', Validators.required);
    this.linea = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre: this.nombre,
      prefijo: this.prefijo,
      familia: this.familia,
      linea: this.linea
    });
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.mantenimientoService.addObject('sublineas-productos', this.registerForm.value ).subscribe(
          (response) => {
            console.log(response);
              this.action.next( true );
              this.notificationService.showSuccess('Se creó el registro correctamente' , 'SubLinea Producto');
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
