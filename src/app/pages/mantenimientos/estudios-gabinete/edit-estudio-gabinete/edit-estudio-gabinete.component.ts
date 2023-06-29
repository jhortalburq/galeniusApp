import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { SharedService, EmpresaService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

@Component({
  selector: 'app-edit-estudio-gabinete',
  templateUrl: './edit-estudio-gabinete.component.html',
  styleUrls: ['./edit-estudio-gabinete.component.scss']
})
export class EditEstudioGabineteComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;
  filteredItem: Observable<any[]>;

  registerForm: FormGroup;
  nombre: FormControl;
  procedimiento: FormControl;

  procedimientos: Array<any> = [];

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();

    for (let i = 0; i < this.registro.items.length; i++) {
      this.procedimientos.push(this.registro.items[i].nombre)
    }
  }

  createFormControls() {
    this.nombre = new FormControl(this.registro.nombre, Validators.required);
    this.procedimiento = new FormControl('');
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        procedimiento: this.procedimiento
     });
  }

  addItem() {
    this.procedimientos.push(this.registerForm.value.procedimiento);
    this.registerForm.patchValue({
        procedimiento: ''
    })
  }

  quitarItem( item: any) {
    let i: number = 0;
    this.procedimientos.forEach((element,index) => {
      if(element==item) this.procedimientos.splice(index, 1);
    });  
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editEstudioGabinete(this.registerForm.value, this.registro.id, this.empresaService.empresa_seleccionada.id, this.procedimientos)
                              .subscribe({
                                next: (response) => {
                                  this.action.next(true);
                                  this.notificationService.showInfo('Registro editado' , 'Estudio Gabinete');
                                  this.modalRef.hide();
                                },
                                error:  err => {
                                  this.disabled = false;
                                  this.notificationService.showError(JSON.stringify(err.error), '');

                                }
                              })
    }
  }

  buscarItem(e){
    this.filteredItem = this.mantenimientoService.getOptionsItems(this.empresaService.empresa_seleccionada.id, e.target.value);
  }

  selectItem(item: any){
    this.procedimientos.push(item.nombre);
    this.registerForm.patchValue({
        procedimiento: ''
    })
  } 

  onKeydown(event) {
    if (event.key === "Enter") {
      this.addItem();
    }
  }
}