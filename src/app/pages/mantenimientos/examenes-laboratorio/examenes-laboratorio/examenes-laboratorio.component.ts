import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2, DoCheck } from '@angular/core';
import { MantenimientoService, SharedService, BreadcrumbsService, NotificationsService} from '../../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import { Router } from '@angular/router';

import { AddExamenLaboratorioComponent } from '../add-examen-laboratorio/add-examen-laboratorio.component';
import { EditExamenLaboratorioComponent } from '../edit-examen-laboratorio/edit-examen-laboratorio.component';


@Component({
  selector: 'app-examenes-laboratorio',
  templateUrl: './examenes-laboratorio.component.html',
  styleUrls: ['./examenes-laboratorio.component.scss']
})
export class ExamenesLaboratorioComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';
  modalRef: MDBModalRef;

  displayedColumns = ['', 'Examen de Laboratorio', 'Clave', 'Grupo Análisis', ''];

  public registros: any = [];

  filter: string;

  changeDetected: boolean = false;

  constructor(
          public sharedService: SharedService,
          public mantenimientoService: MantenimientoService,
          private modalService: MDBModalService,
          public breadcrumbService: BreadcrumbsService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.title = 'EXÁMENES DE LABORATORIO';

  }

  ngDoCheck() {
    if (!this.changeDetected) {
      if(this.sharedService.organizacion_seleccionada.id) {
        this.getData();
        this.changeDetected = true;
      }
    }
  }

  getData(url?) {
    if (url) {
        this.mantenimientoService.getDataMantenimientoURL(url, this.sharedService.organizacion_seleccionada.id).subscribe({
          next: (response: any) => {
                this.registros = response.results;
                this.nextURL = response.next;
                this.prevURL = response.previous;
                this.total = response.count;
            },
          error: (error: any) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          }
        });
    } else {
        this.mantenimientoService.getDataMantenimiento('examenes-laboratorio', this.sharedService.organizacion_seleccionada.id).subscribe({
          next: (response: any) => {
                this.registros = response.results;
                this.nextURL = response.next;
                this.prevURL = response.previous;
                this.total = response.count;
            },
          error: (error: any) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          }
        });
    }
  }

  openModal() {
    this.modalRef = this.modalService.show(AddExamenLaboratorioComponent, {
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
        this.getData();
        this.filter = '';
      }
    });
  }

  editModal(registro: any): void {

    this.modalRef = this.modalService.show(EditExamenLaboratorioComponent, {
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
        this.getData();
        this.filter = '';
      }
    });
  }

  onNext(): void {
    if (!this.lastPage()){
        this.page += 1
        this.getData(this.nextURL)
    }
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.total;
  }

  onPrev(): void {
    if (this.page >1){
        this.page -= 1
        this.getData(this.prevURL)
    }
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.mantenimientoService.getDataMantenimiento('examenes-laboratorio', this.sharedService.organizacion_seleccionada.id, filterValue).subscribe((response: any) => {
      this.registros = response.results;
      this.nextURL = response.next;
      this.prevURL = response.previous;
      this.total = response.count;
    });
  }

  verDetalle(id: number) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/mantenimientos/examenes-laboratorio/${id}/detalle`;
    this.router.navigate([url])
  }
}
