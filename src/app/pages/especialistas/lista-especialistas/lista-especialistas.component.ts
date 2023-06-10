import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { NuevoEspecialistaComponent } from '../nuevo-especialista/nuevo-especialista.component';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent {
  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'Nombre Completo', 
    'N° Documento',
    'Edad', 
    'Lugar',
    'Especialidades',
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

  nuevoRegistro() {
    this.router.navigate(['/asistencial/especialistas/nuevo'])
  }
}
