import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2, DoCheck } from '@angular/core';
import { AlmacenService, EmpresaService } from '../../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { AgregarSucursalComponent } from '../agregar-sucursal/agregar-sucursal.component';
import { DetalleSucursalComponent } from '../detalle-sucursal/detalle-sucursal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-sucursales',
  templateUrl: './lista-sucursales.component.html',
  styleUrls: ['./lista-sucursales.component.scss']
})

export class ListaSucursalesComponent implements OnInit, DoCheck {
  modalRef: MDBModalRef;

  displayedColumns = ['Nombre Sucursal', 'Tipo Tienda', 'Direccion', 'Ubigeo',  'Almacén', 'Activo', ''];

  public sucursales: any = [];

  filter: string;

  changeDetected: boolean = false;

  constructor(
          public empresaService: EmpresaService,
          public almacenService: AlmacenService,
          private modalService: MDBModalService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
   
  }

  ngDoCheck() {
    if (!this.changeDetected) {
      if(this.empresaService.empresa_seleccionada.id) {
        this.getData(this.empresaService.empresa_seleccionada.id);
        this.changeDetected = true;
      }
    }
  }

  getData(url?) {
    this.almacenService.getSucursalesUsuario(this.empresaService.empresa_seleccionada.id).subscribe(
      (response: any) => {
        this.sucursales = response.results;
      },
      (error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(AgregarSucursalComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog modal-notify modal-primary',
                  animated: true,
              });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      if (result) {
        this.getData(this.empresaService.empresa_seleccionada.id);
        this.filter = '';
      }
    });
  }

  editModal(sucursal: any): void {

    this.modalRef = this.modalService.show(DetalleSucursalComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog cascading-modal ',
                  animated: true,
                  data: {
                      content: { sucursal: sucursal}
                  }
              }
    );

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      console.log(result);

      if (result) {
        this.getData(this.empresaService.empresa_seleccionada.id);
        this.filter = '';
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.almacenService.getSucursalesUsuario(this.empresaService.empresa_seleccionada.id, filterValue).subscribe((response: any) => {
      this.sucursales = response.results;
    });
  }

  changeStatus(sucursal: any) {

     this.almacenService.editSucursal( sucursal, sucursal.id, this.empresaService.empresa_seleccionada.id ).subscribe(
          (response) => {

               if (sucursal.activo) {
                  this.notificationService.showInfo('Se cambio el estado de la Sucursal', 'Sucursal Activo')
                } else {
                  this.notificationService.showInfo('Se cambio el estado de la Sucursal', 'Sucursal Inactivo')
                }

                this.almacenService.getSucursalesUsuario(this.empresaService.empresa_seleccionada.id).subscribe();
            },
            err => {
                  console.log(err);
            }
        );


  }

}
