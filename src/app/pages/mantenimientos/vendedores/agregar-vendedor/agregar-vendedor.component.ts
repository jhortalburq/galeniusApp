import { Component, OnInit } from '@angular/core';
import { MDBModalRef, IMyOptions } from '../../../../../../ng-uikit-pro-standard/src/public_api';

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
  selector: 'app-agregar-vendedor',
  templateUrl: './agregar-vendedor.component.html',
  styleUrls: ['./agregar-vendedor.component.scss']
})
export class AgregarVendedorComponent implements OnInit {

public myDatePickerOptions: IMyOptions = {
      // Strings and translations
      dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
      dayLabelsFull: {su: "Domingo", mo: "Lunes", tu: "Martes", we: "Miercoles", th: "Jueves", fr: "Viernes", sa:
      "Sabado"},
      monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10:
      'Oct', 11: 'Nov', 12: 'Dic' },
      monthLabelsFull: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8:
      "Agosto", 9: "Setiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" },

      // Buttons
      todayBtnTxt: "Hoy",
      clearBtnTxt: "Limpiar",
      closeBtnTxt: "Cerrar",

      // Format
      dateFormat: 'dd/mm/yyyy',

      // First day of the week
      firstDayOfWeek: 'mo',

      // // Disable dates
      disableWeekends: false,

      // Enable dates (when disabled)

      // Year limits
      minYear: 1940,
      maxYear: 2020,

      // Show Today button
      showTodayBtn: true,

      // Show Clear date button
      showClearDateBtn: true,

      markCurrentDay: true,
      disableHeaderButtons: false,
      showWeekNumbers: false,
      height: '100px',
      width: '50%',
      selectionTxtFontSize: '15px'
    };

  registerForm: FormGroup;
  vendedor: FormControl;
  fecha_nacimiento: FormControl;
  fecha_ingreso: FormControl;
  cargo_vendedor: FormControl;
  genero: FormControl;
  telefono: FormControl;
  correo: FormControl;
  direccion: FormControl;
  locacion: FormControl;
  documento_identidad: FormControl;

  cargosOptions: any;
  generoOptions: any;

  filteredUbigeo: Observable<any[]>;

  action: Subject<any> = new Subject();


  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public empresaService: EmpresaService,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.opcionesCargoVendedor();
    this.opcionesGenero();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.vendedor = new FormControl('', Validators.required);
    this.cargo_vendedor = new FormControl('');
    this.genero = new FormControl('');
    this.telefono = new FormControl('');
    this.correo = new FormControl('', Validators.email);
    this.direccion = new FormControl('');
    this.locacion = new FormControl('');
    this.fecha_nacimiento = new FormControl('');
    this.fecha_ingreso = new FormControl('');
    this.documento_identidad = new FormControl('');
  }


  createForm() {
     this.registerForm = new FormGroup({
      vendedor: this.vendedor,
      cargo_vendedor: this.cargo_vendedor,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      locacion: this.locacion,
      genero: this.genero,
      fecha_nacimiento: this.fecha_nacimiento,
      fecha_ingreso: this.fecha_ingreso,
      documento_identidad: this.documento_identidad,

     });

  }

  onSubmit() {

    if (this.registerForm.valid && this.empresaService.empresa_seleccionada.id) {

        this.mantenimientoService.addVendedor(this.registerForm.value, this.empresaService.empresa_seleccionada.id ).subscribe(
          (response) => {
              this.action.next( true );
              this.notificationService.showSuccess('Se creó el registro correctamente' , 'Vendedor');
              this.modalRef.hide();
            },
            err => {
                  console.log(err);
            }
        );

    }
  }

  // onDisplayValue(color: Color): string | undefined {
  //   console.log(color)
  //   return color ? color.name : undefined;
  // }

  opcionesGenero(){
     this.sharedService.getOptionsGenero().subscribe( res => {
       this.generoOptions = res;
     });
  }

  opcionesCargoVendedor(){
     this.sharedService.getOptionsCargoVendedor(this.empresaService.empresa_seleccionada.id).subscribe( res => {
       this.cargosOptions = res;
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

