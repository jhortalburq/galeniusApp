import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';

import { AgregarMarcaComponent } from '../agregar-marca/agregar-marca.component';
import { EditarMarcaComponent } from '../editar-marca/editar-marca.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-marca',
  templateUrl: './lista-marca.component.html',
  styleUrls: ['./lista-marca.component.scss']
})

export class ListaMarcaComponent implements OnInit {
    modalRef: MDBModalRef;
  
    displayedColumns = [ 'Marca', 'Activo', ''];
  
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
      this.mantenimientoService.getQueryset('marcas').subscribe(
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
      this.modalRef = this.modalService.show(AgregarMarcaComponent, {
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
  
      this.modalRef = this.modalService.show(EditarMarcaComponent, {
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
  
      this.mantenimientoService.getQueryset('marcas', filterValue).subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
    changeStatus(registro: any) {
      
      this.mantenimientoService.editObject('marcas', registro, registro.id ).subscribe(
           (response) => {
 
                if (registro.activo) {
                   this.notificationService.showInfo('Se cambió el estado ', 'Marca Activo')
                 } else {
                   this.notificationService.showInfo('Se cambió el estado ', 'Marca Inactivo')
                 }
 
                 this.mantenimientoService.getQueryset('marcas').subscribe();
             },
             err => {
                   console.log(err);
             }
         );
 
   }

  }
  