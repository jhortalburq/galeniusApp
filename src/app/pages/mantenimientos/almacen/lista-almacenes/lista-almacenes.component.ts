import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2, DoCheck } from '@angular/core';
import { AlmacenService, EmpresaService } from '../../../../services/services.index';

import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { AgregarAlmacenComponent } from '../agregar-almacen/agregar-almacen.component';
import { DetalleAlmacenComponent } from '../detalle-almacen/detalle-almacen.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-almacenes',
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.scss']
})
export class ListaAlmacenesComponent implements OnInit{
    modalRef: MDBModalRef;
  
    displayedColumns = ['Codigo', 'Nombre Almacén', 'Abreviado',  'Dirección',  'Nro Ingresos', 'Nro Salidas', 'Activo', ''];
  
    public registros: any = [];
  
    filter: string;
  
    constructor(
            public empresaService: EmpresaService,
            public almacenService: AlmacenService,
            private modalService: MDBModalService,
            private renderer: Renderer2,
            public notificationService: NotificationsService,
            private router: Router
    ) { }
  
    ngOnInit(): void {
      this.getData();
    }
  
    getData(url?) {
      this.almacenService.getAlmacenes().subscribe(
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
      this.modalRef = this.modalService.show(AgregarAlmacenComponent, {
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
  
    editModal(registro: any): void {
  
      this.modalRef = this.modalService.show(DetalleAlmacenComponent, {
                    backdrop: true,
                    keyboard: true,
                    focus: true,
                    show: false,
                    ignoreBackdropClick: false,
                    class: 'modal-lg modal-dialog cascading-modal ',
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
  
      this.almacenService.getAlmacenes(filterValue).subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
    changeStatus(registro: any) {
  
       this.almacenService.editAlmacen(registro, registro.id).subscribe(
            (response) => {
  
                 if (registro.activo) {
                    this.notificationService.showInfo('Se cambio el estado', 'Almacém Activo')
                  } else {
                    this.notificationService.showInfo('Se cambio el estado', 'Almacén Inactivo')
                  }
  
                  this.almacenService.getAlmacenes().subscribe();
              },
              err => {
                    console.log(err);
              }
          );
  
  
    }
  }
