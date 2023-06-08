import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';
import { AgregarFamiliaComponent } from '../agregar-familia/agregar-familia.component';
import { EditarFamiliaComponent } from '../editar-familia/editar-familia.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-familia',
  templateUrl: './lista-familia.component.html',
  styleUrls: ['./lista-familia.component.scss']
})
export class ListaFamiliaComponent implements OnInit {
  modalRef: MDBModalRef;

  displayedColumns = ['Familia Producto', 'Codigo', ''];

  public registros: any = [];

  filter: string;

  constructor(
          public mantenimientoService: MantenimientoService,
          private modalService: MDBModalService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(url?) {
    this.mantenimientoService.getQueryset('familias-productos').subscribe(
      (response: any) => {
      this.registros = response.results;
      },
      (error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(AgregarFamiliaComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-danger ',
                  animated: true,
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

    this.modalRef = this.modalService.show(EditarFamiliaComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-danger ',
                  animated: true,
                  data: {
                      content: { registro: registro}
                  }
              }
    );

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      if (result) {
        this.getData();
        this.filter = '';
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.mantenimientoService.getQueryset('familias-productos', filterValue).subscribe((response: any) => {
      this.registros = response.results;
    });
  }

}
