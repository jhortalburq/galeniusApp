import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { SharedService, EmpresaService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.scss']
})
export class EditGrupoComponent {
  @Input() registro;
  @Input() examen_id;
  @Input() analisis_registrados: Array<any>;

  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  examen: FormControl;

  public analisis: any = [];

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        private router: Router,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getAnalisis();
    this.createFormControls();
    this.createForm();
  }

  getAnalisis(url?) {
    this.mantenimientoService.getDataMantenimiento('analisis-options', this.empresaService.empresa_seleccionada.id).subscribe({
      next: (response: any) => {
        // this.analisis = response.results.map( (item) => {
        //   return {...item, checked: false}
        // })

        this.analisis = response.results.map(item => {
            return {...item, checked: this.analisis_registrados.some(o2 => item.id === o2.id)}

        })

      },
      error: (error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    });
  }


  createFormControls() {
    this.nombre = new FormControl(this.registro.nombre, Validators.required);
    this.examen = new FormControl(this.examen_id, Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        examen: this.examen,
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editGrupoAnalisis(this.registerForm.value, this.registro.id, this.empresaService.empresa_seleccionada.id, this.analisis_registrados)
                              .subscribe({
                                next: (response) => {
                                  this.action.next(true);
                                  this.notificationService.showInfo('Registro editado' , this.registro.nombre);
                                  this.modalRef.hide();
                                },
                                error:  err => {
                                  this.disabled = false;
                                  this.notificationService.showError(JSON.stringify(err.error), '');

                                }
                              })
    }
  }

  addItem( item: any ) {
    item.checked = true;
    this.analisis_registrados.push(item)
  }
  
  quitarItem( item: any) {
    let i: number = 0;
    this.analisis_registrados.forEach((element,index) => {
      if(element==item) this.analisis_registrados.splice(index, 1);
    });

    this.analisis.forEach((element,index) => {
      if(element.id==item.id) element.checked = false;
    });  
  }


  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.mantenimientoService.getDataMantenimiento('analisis-options', this.empresaService.empresa_seleccionada.id, filterValue).subscribe((response: any) => {
      this.analisis = response.results;
    });
  }


}
