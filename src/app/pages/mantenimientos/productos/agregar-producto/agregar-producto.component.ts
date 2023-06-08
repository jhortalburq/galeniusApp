import { Component, OnInit } from '@angular/core';

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
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {

  registerForm: FormGroup;

  producto: FormControl;
  familia: FormControl;
  linea: FormControl;
  sublinea: FormControl;
  unidad: FormControl;

  precio_venta: FormControl;
  precio_compra: FormControl;
  moneda_compra: FormControl;
  codigo_barras: FormControl;

  familiaOptions: any = [{value: '', label: '-----------'}];
  lineaOptions: any = [{value: '', label: '-----------'}];
  sublineaOptions: any = [{value: '', label: '-----------'}];

  action: Subject<any> = new Subject();

  constructor(
        public fb: FormBuilder,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public empresaService: EmpresaService,
        public notificationService: NotificationsService
  ) {  }

  ngOnInit(): void {
    this.opcionesFamiliaProductos();
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


 seleccionarLinea(e: any) {
  this.opcionesSubLineaProductos(e.id);
}

  opcionesLineaProductos(idFamilia: number){
    this.mantenimientoService.getFamiliaLineasProducto(idFamilia).subscribe( (res: any) => {
        this.lineaOptions = [{value: '', label: '-----------'}].concat(res.results);
    });
 }

 opcionesSubLineaProductos(idLinea: number){
   
  this.mantenimientoService.getSubLineaProductoLineas(this.registerForm.value.familia, idLinea).subscribe( (res: any) => {
      this.sublineaOptions = [{value: '', label: '-----------'}].concat(res.results);
  });
}

 createFormControls() {
    this.producto = new FormControl('', Validators.required);
    this.familia = new FormControl('', Validators.required);
    this.linea = new FormControl('', Validators.required);
    this.sublinea = new FormControl('', Validators.required);
    this.unidad = new FormControl('', Validators.required);

    this.codigo_barras = new FormControl('');
    this.precio_compra = new FormControl('');
    this.precio_venta = new FormControl('');
    this.moneda_compra = new FormControl('');

  }

  createForm() {
     this.registerForm = new FormGroup({
      producto: this.producto,
      familia: this.familia,
      linea: this.linea,
      sublinea: this.sublinea,
      precio_compra: this.precio_compra,
      precio_venta: this.precio_venta,
      moneda_compra: this.moneda_compra,
      codigo_barras: this.codigo_barras,
      unidad: this.unidad
    });
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.mantenimientoService.addObject('productos', this.registerForm.value ).subscribe(
          (response) => {
            console.log(response);
              this.action.next( true );
              this.notificationService.showSuccess('Se creó el registro correctamente' , 'Producto');
            },
            err => {
                  console.log(err);
                  this.notificationService.showError(JSON.stringify(err.error), '');

            }
        );

    }
  }

}
