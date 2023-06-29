import { Component, Input } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

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
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.scss']
})
export class NuevoGrupoComponent {
  @Input() examen_id;
  @Input() analisis_registrados: Array<any>;

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
        public notificationService: NotificationsService,
        private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnalisis();
    this.createFormControls();
    this.createForm();
  }

  getAnalisis(url?) {
    this.mantenimientoService.getDataMantenimiento('analisis-options', this.empresaService.empresa_seleccionada.id).subscribe({
      next: (response: any) => {
          this.analisis = response.results.map( (item) => {
            return {...item, checked: false}
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
    this.nombre = new FormControl('', Validators.required);
    this.examen = new FormControl(this.examen_id);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        examen: this.examen
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.addGrupoAnalisis(this.registerForm.value, this.empresaService.empresa_seleccionada.id, this.analisis_registrados)
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
