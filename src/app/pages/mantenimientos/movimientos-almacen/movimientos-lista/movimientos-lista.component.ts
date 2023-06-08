import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';

import { AgregarMovimientoComponent } from '../agregar-movimiento/agregar-movimiento.component';
import { EditarMovimientoComponent } from '../editar-movimiento/editar-movimiento.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-lista',
  templateUrl: './movimientos-lista.component.html',
  styleUrls: ['./movimientos-lista.component.scss']
})

export class MovimientosListaComponent implements OnInit {
    modalRef: MDBModalRef;
  
    displayedColumns = [ 'Movimiento', 'Tipo Movimiento', 'Activo', ''];
  
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
      this.mantenimientoService.getQueryset('movimientos-almacen').subscribe(
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
      this.modalRef = this.modalService.show(AgregarMovimientoComponent, {
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
  
      this.modalRef = this.modalService.show(EditarMovimientoComponent, {
                    backdrop: true,
                    keyboard: true,
                    focus: true,
                    show: false,
                    ignoreBackdropClick: false,
                    class: 'modal-lg modal-dialog modal-notify modal-primary ',
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
  
      this.mantenimientoService.getQueryset('movimientos-almacen', filterValue).subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
    changeStatus(registro: any) {

      this.mantenimientoService.editObject('movimientos-almacen', registro, registro.id ).subscribe(
           (response) => {
 
                if (registro.activo) {
                   this.notificationService.showInfo('Se cambió el estado ', 'Movimiento Activo')
                 } else {
                   this.notificationService.showInfo('Se cambió el estado ', 'Movimiento Inactivo')
                 }
 
                 this.mantenimientoService.getQueryset('movimientos-almacen').subscribe();
             },
             err => {
                   console.log(err);
             }
         );
 
   }

  }
  