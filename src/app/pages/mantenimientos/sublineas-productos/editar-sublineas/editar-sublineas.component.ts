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
  selector: 'app-editar-sublineas',
  templateUrl: './editar-sublineas.component.html',
  styleUrls: ['./editar-sublineas.component.scss']
})
export class EditarSublineasComponent implements OnInit {

  content: any;
  action: Subject<any> = new Subject();

  @Input() registro;
  @Output() submitChange = new EventEmitter();

  registerForm: FormGroup;

  nombre: FormControl;
  familia: FormControl;
  linea: FormControl;

  familiaOptions: any = [{value: '', label: '-----------'}];
  lineaOptions: any = [{value: '', label: '-----------'}];

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
    console.log(this.content.registro.familia)
    this.opcionesLineaProductos(this.content.registro.familia);
    this.createFormControls();
    this.createForm();
  }


 seleccionarFamilia(e: any) {
    this.opcionesLineaProductos(e.id);
 }

  opcionesFamiliaProductos(){
    this.mantenimientoService.getQueryset('familias-productos').subscribe( (res: any) => {
        this.familiaOptions = res.results;
    });
 }

 opcionesLineaProductos(idFamilia: number){
  this.mantenimientoService.getFamiliaLineasProducto(idFamilia).subscribe( (res: any) => {
      this.lineaOptions = [{value: '', label: '-----------'}].concat(res.results);
  });
}

  createFormControls() {
    this.nombre = new FormControl(this.content.registro.nombre, Validators.required);
    this.familia = new FormControl(this.content.registro.familia, Validators.required);
    this.linea = new FormControl(this.content.registro.linea, Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre: this.nombre,
      familia: this.familia,
      linea: this.linea
     });
  }

  onEditEmpresa(submit: boolean) {
    if (submit) {
        this.action.next( true );
        this.modalRef.hide();
    }
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.mantenimientoService.editObject('sublineas-productos', this.registerForm.value, this.content.registro.id ).subscribe(
          (response) => {
              this.action.next( true );
              this.notificationService.showSuccess('Se editó el registro Correctamente' , 'SubLinea Producto');
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
