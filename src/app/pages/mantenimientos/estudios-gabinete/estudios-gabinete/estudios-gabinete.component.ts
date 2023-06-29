import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2, DoCheck } from '@angular/core';
import { MantenimientoService, EmpresaService, BreadcrumbsService, NotificationsService} from '../../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import { Router } from '@angular/router';

import { AddEstudioGabineteComponent } from '../add-estudio-gabinete/add-estudio-gabinete.component';
import { EditEstudioGabineteComponent } from '../edit-estudio-gabinete/edit-estudio-gabinete.component';


@Component({
  selector: 'app-estudios-gabinete',
  templateUrl: './estudios-gabinete.component.html',
  styleUrls: ['./estudios-gabinete.component.scss']
})
export class EstudiosGabineteComponent {
  modalRef: MDBModalRef;

  displayedColumns = ['', 'Estudios Gabinete', 'Procedimientos',  ''];

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
    this.breadcrumbService.title = 'ESTUDIOS DE GABINETE';

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
    this.mantenimientoService.getDataMantenimiento('estudios-gabinete', this.empresaService.organizacion_seleccionada.id).subscribe({
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
    this.modalRef = this.modalService.show(AddEstudioGabineteComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary modal-lg',
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

    this.modalRef = this.modalService.show(EditEstudioGabineteComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary modal-lg',
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

    this.mantenimientoService.getDataMantenimiento('estudios-gabinete', this.empresaService.organizacion_seleccionada.id, filterValue).subscribe((response: any) => {
      this.registros = response.results;
    });
  }
}
