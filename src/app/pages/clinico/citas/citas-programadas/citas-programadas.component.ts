import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { NuevaCitaComponent } from '../nueva-cita/nueva-cita.component';

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.scss']
})
export class CitasProgramadasComponent implements OnInit{
  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'Nombre Completo', 
    'N° Documento',
    'Edad', 
    'Tipo de Cita',
    'Especialista',
    'Especialidad',
    'Fecha Cita',
    'Hora Inicio',
    'Hora Fin',
    'Estado',
    'Creado',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      private router: Router
  ) { }

  ngOnInit(): void {
  // this.getData();
  }

  openModal() {
    this.modalRef = this.modalService.show(NuevaCitaComponent, {
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
        // this.getData();
        // this.filter = '';
      }
    });
  }
}
