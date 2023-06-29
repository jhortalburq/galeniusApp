import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { SharedService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

@Component({
  selector: 'app-add-estudio-gabinete',
  templateUrl: './add-estudio-gabinete.component.html',
  styleUrls: ['./add-estudio-gabinete.component.scss']
})
export class AddEstudioGabineteComponent {
  action: Subject<any> = new Subject();
  disabled: boolean = false;
  filteredItem: Observable<any[]>;

  registerForm: FormGroup;
  nombre: FormControl;
  procedimiento: FormControl;

  procedimientos: Array<any> = [];

  constructor(
        public modalRef: MDBModalRef,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
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

      this.mantenimientoService.addEstudioGabinete(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.procedimientos)
                                  .subscribe({
                                    next: (response: any) => {
                                      this.action.next(true);
                                      this.notificationService.showInfo('Registro creado' , response.nombre);
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
    this.filteredItem = this.mantenimientoService.getOptionsItems(this.sharedService.organizacion_seleccionada.id, e.target.value);
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