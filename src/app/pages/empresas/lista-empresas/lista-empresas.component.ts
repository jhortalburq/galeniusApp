import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { SharedService } from '../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../services/notifications.service';

import { AgregarEmpresaComponent } from '../agregar-empresa/agregar-empresa.component';
import { DetalleEmpresaComponent } from '../detalle-empresa/detalle-empresa.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})

export class ListaEmpresasComponent implements OnInit {
  modalRef: MDBModalRef;

  displayedColumns = ['Razón Social', 'RUC', 'Dirección', 'Ubigeo', 'Activo', ''];

  public empresas: any = [];

  filter: string;

  constructor(
          public sharedService: SharedService,
          private modalService: MDBModalService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(url?) {
    this.sharedService.getOrganizacionesUsuario().subscribe({
      next: (response: any) => {
        this.empresas = response.results;
        console.log(this.empresas)
      },
      error: (error: any) => {
          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
      }

    })
  }

  openModal() {
    this.modalRef = this.modalService.show(AgregarEmpresaComponent, {
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

  editModal(empresa: any): void {

    this.modalRef = this.modalService.show(DetalleEmpresaComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog cascading-modal ',
                  animated: true,
                  data: {
                      content: { empresa: empresa}
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

    this.sharedService.getOrganizacionesUsuario(filterValue).subscribe((response: any) => {
      this.empresas = response.results;
    });
  }

  changeStatus(empresa: any) {

     this.sharedService.editOrganizacion( empresa, empresa.id ).subscribe(
          (response) => {
            if (empresa.activo) {
                  this.notificationService.showInfo('Se cambio el estado ', 'Empresa Activa');
                } else {
                  this.notificationService.showInfo('Se cambio el estado ', 'Empresa Inactiva');
                }

            this.sharedService.getOrganizacionesUsuario().subscribe();

            },
            err => {
                  console.log(err);
            }
        );


  }

}
