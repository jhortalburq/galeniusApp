import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { BreadcrumbsService } from '../../../services/breadcrumbs.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'Nombre Completo', 
    'Edad', 
    'Género',
    'Tipo Documento',
    'N° Documento',
    'Fecha de Nacimiento',
    'Creado',
    '',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      public breadcrumbService: BreadcrumbsService,
      private router: Router
  ) { }

  ngOnInit(): void {
  // this.getData();
    this.breadcrumbService.title = 'REGISTRO DE PACIENTES';
  }

  nuevoRegistro() {
    this.router.navigate(['/asistencial/pacientes/nuevo'])
  }
}
