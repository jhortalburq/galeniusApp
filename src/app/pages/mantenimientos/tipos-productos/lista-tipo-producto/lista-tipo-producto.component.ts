import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';

import { AgregarTipoProductoComponent } from '../agregar-tipo-producto/agregar-tipo-producto.component';
import { EditarTipoProductoComponent } from '../editar-tipo-producto/editar-tipo-producto.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-tipo-producto',
  templateUrl: './lista-tipo-producto.component.html',
  styleUrls: ['./lista-tipo-producto.component.scss']
})
export class ListaTipoProductoComponent implements OnInit {
    modalRef: MDBModalRef;
  
    displayedColumns = [ 'Tipo Producto', 'Abreviado', 'Codigo Tributario', 'Activo', ''];
  
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
      this.mantenimientoService.getQueryset('tipos-productos').subscribe(
        (response: any) => {
          console.log(response.results)
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
      this.modalRef = this.modalService.show(AgregarTipoProductoComponent, {
                    backdrop: true,
                    keyboard: true,
                    focus: true,
                    show: false,
                    ignoreBackdropClick: false,
                    class: 'modal-lg modal-dialog modal-notify modal-danger ',
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
  
      this.modalRef = this.modalService.show(EditarTipoProductoComponent, {
                    backdrop: true,
                    keyboard: true,
                    focus: true,
                    show: false,
                    ignoreBackdropClick: false,
                    class: 'modal-lg modal-dialog modal-notify modal-danger ',
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
  
      this.mantenimientoService.getQueryset('tipos-productos', filterValue).subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
    changeStatus(registro: any) {
      
      this.mantenimientoService.editObject('tipos-productos', registro, registro.id ).subscribe(
           (response) => {
 
                if (registro.activo) {
                   this.notificationService.showInfo('Se cambió el estado ', 'Tipo Producto Activo')
                 } else {
                   this.notificationService.showInfo('Se cambió el estado ', 'Tipo Producto Inactivo')
                 }
 
                 this.mantenimientoService.getQueryset('tipos-productos').subscribe();
             },
             err => {
                   console.log(err);
             }
         );
 
   }

  }
  