import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../../services/notifications.service';

import { MantenimientoService } from '../../../../services/services.index';
import { AgregarUnidadComponent } from '../agregar-unidad/agregar-unidad.component';
import { EditarUnidadComponent } from '../editar-unidad/editar-unidad.component';


@Component({
  selector: 'app-lista-unidades',
  templateUrl: './lista-unidades.component.html',
  styleUrls: ['./lista-unidades.component.scss']
})

export class ListaUnidadesComponent implements OnInit {
    modalRef: MDBModalRef;
  
    displayedColumns = ['Unidad de Medida', 'Codigo', 'Codigo Tributario',  ''];
  
    public registros: any = [];
  
    filter: string;
  
    constructor(
            public mantenimientoService: MantenimientoService,
            private modalService: MDBModalService,
            private renderer: Renderer2,
            public notificationService: NotificationsService
    ) { }
  
    ngOnInit(): void {
      this.getData();
    }
  
    getData(url?) {
      this.mantenimientoService.getQueryset('unidades-medida').subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
    openModal() {
      this.modalRef = this.modalService.show(AgregarUnidadComponent, {
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
  
      this.modalRef = this.modalService.show(EditarUnidadComponent, {
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
  
      this.mantenimientoService.getQueryset('unidades-medida', filterValue).subscribe((response: any) => {
        this.registros = response.results;
      });
    }
  
  }
  