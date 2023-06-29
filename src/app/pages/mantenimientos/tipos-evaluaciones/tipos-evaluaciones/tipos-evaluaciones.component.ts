import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2, DoCheck } from '@angular/core';
import { MantenimientoService, EmpresaService, BreadcrumbsService, NotificationsService} from '../../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import { AddTipoEvaluacionComponent } from '../add-tipo-evaluacion/add-tipo-evaluacion.component';
import { EditTipoEvaluacionComponent } from '../edit-tipo-evaluacion/edit-tipo-evaluacion.component';

import { Router } from '@angular/router';


@Component({
  selector: 'app-tipos-evaluaciones',
  templateUrl: './tipos-evaluaciones.component.html',
  styleUrls: ['./tipos-evaluaciones.component.scss']
})
export class TiposEvaluacionesComponent {
  modalRef: MDBModalRef;

  displayedColumns = ['', 'Tipo de Evaluación', 'Clave', ''];

  public registros: any = [];

  filter: string;

  changeDetected: boolean = false;

  constructor(
          public empresaService: EmpresaService,
          public mantenimientoService: MantenimientoService,
          private modalService: MDBModalService,
          public breadcrumbService: BreadcrumbsService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.title = 'TIPOS DE EVALUACIÓN';

  }

  ngDoCheck() {
    if (!this.changeDetected) {
      if(this.empresaService.organizacion_seleccionada.id) {
        this.getData(this.empresaService.organizacion_seleccionada.id);
        this.changeDetected = true;
      }
    }
  }

  getData(url?) {
    this.mantenimientoService.getDataMantenimiento('tipos-evaluacion', this.empresaService.organizacion_seleccionada.id).subscribe({
      next: (response: any) => {
        this.registros = response.results;
      },
      error: (error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(AddTipoEvaluacionComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
                  data: {
                  }
              });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      if (result) {
        this.getData(this.empresaService.organizacion_seleccionada.id);
        this.filter = '';
      }
    });
  }

  editModal(registro: any): void {

    this.modalRef = this.modalService.show(EditTipoEvaluacionComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
                  data: {
                      registro: registro
                  }
              }
    );

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      console.log(result);

      if (result) {
        this.getData(this.empresaService.organizacion_seleccionada.id);
        this.filter = '';
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.mantenimientoService.getDataMantenimiento('tipos-evaluacion', this.empresaService.organizacion_seleccionada.id, filterValue).subscribe((response: any) => {
      this.registros = response.results;
    });
  }
}
