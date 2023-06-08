import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';

import { AgregarCaracteristicaComponent} from '../agregar-caracteristica/agregar-caracteristica.component';
import { EditarCaracteristicaComponent } from '../editar-caracteristica/editar-caracteristica.component';
import { RegistrosComponent } from '../registros/registros.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-caracteristicas',
  templateUrl: './lista-caracteristicas.component.html',
  styleUrls: ['./lista-caracteristicas.component.scss']
})
export class ListaCaracteristicasComponent implements OnInit {
    modalRef: MDBModalRef;
  
    displayedColumns = [ 'Características', 'Identificador', 'Activo',  '', ''];
  
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
      this.mantenimientoService.getQueryset('caracteristicas').subscribe(
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
      this.modalRef = this.modalService.show(AgregarCaracteristicaComponent, {
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
  
      this.modalRef = this.modalService.show(EditarCaracteristicaComponent, {
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

    registrosModal(registro: any): void {
  
      this.modalRef = this.modalService.show(RegistrosComponent, {
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
  
      this.mantenimientoService.getQueryset('caracteristicas', filterValue).subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
    changeStatus(registro: any) {
      
      this.mantenimientoService.editObject('caracteristicas', registro, registro.id ).subscribe(
           (response) => {
 
                if (registro.activo) {
                   this.notificationService.showInfo('Estado Activo', 'Características')
                 } else {
                   this.notificationService.showInfo('Estado Inactivo', 'Características')
                 }
 
                 this.mantenimientoService.getQueryset('caracteristicas').subscribe();
             },
             err => {
                   console.log(err);
             }
         );
 
   }
    
  }
  