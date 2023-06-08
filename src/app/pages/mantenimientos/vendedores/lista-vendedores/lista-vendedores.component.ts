import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';
import { AgregarVendedorComponent } from '../agregar-vendedor/agregar-vendedor.component';
import { EditarVendedorComponent } from '../editar-vendedor/editar-vendedor.component';

import { MantenimientoService, EmpresaService } from '../../../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-vendedores',
  templateUrl: './lista-vendedores.component.html',
  styleUrls: ['./lista-vendedores.component.scss']
})
export class ListaVendedoresComponent implements OnInit {
  modalRef: MDBModalRef;

  displayedColumns = ['Codigo', 'Vendedor', 'Cargo Vendedor', 'Nro Documento', 'Genero', 'Telefono', 'Email', ''];

  public registros: any = [];

  filter: string;

  constructor(
          public mantenimientoService: MantenimientoService,
          public empresaService: EmpresaService,
          private modalService: MDBModalService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(url?) {
    console.log('sisis');
    console.log(this.empresaService.empresa_seleccionada)
    this.mantenimientoService.getVendedores(this.empresaService.empresa_seleccionada.id).subscribe(
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
    this.modalRef = this.modalService.show(AgregarVendedorComponent, {
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

  editModal(cliente: any): void {

    this.modalRef = this.modalService.show(EditarVendedorComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog modal-notify modal-primary ',
                  animated: true,
                  data: {
                      content: { cliente: cliente}
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

    this.mantenimientoService.getVendedores(this.empresaService.empresa_seleccionada.id, filterValue).subscribe((response: any) => {
      this.registros = response.results;
    });
  }

}

