import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';

import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from '../editar-proveedor/editar-proveedor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.scss']
})
export class ListaProveedoresComponent implements OnInit {
  modalRef: MDBModalRef;

  displayedColumns = ['Nombre/Razón Social', 'Tipo Documento', 'Nro Documento',  'Telefono', 'Email', ''];

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
    this.mantenimientoService.getQueryset('proveedores').subscribe(
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
    this.modalRef = this.modalService.show(AgregarProveedorComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog modal-notify modal-primary ',
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

  editModal(proveedor: any): void {

    this.modalRef = this.modalService.show(EditarProveedorComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog modal-notify modal-primary ',
                  animated: true,
                  data: {
                      content: { proveedor: proveedor}
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

    this.mantenimientoService.getQueryset('proveedores', filterValue).subscribe((response: any) => {
      this.registros = response.results;
    });
  }

}
