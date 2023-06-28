import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { BreadcrumbsService, PacientesService } from '../../../services/services.index';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  pacientes: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'Nombre Completo', 
    'Tipo Documento',
    'N° Documento',
    'Edad', 
    'Género',
    'Empresa',
    'Email',
    'Telefono',
    'Nacionalidad',
    'Creado',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      public breadcrumbService: BreadcrumbsService,
      public pacienteService: PacientesService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'REGISTRO DE PACIENTES';
  }

  getData() {
    this.pacienteService.getPacientes().subscribe({
      next: (res: any) => {
        this.pacientes = res.results;
      },
      error: (err: any) => {
        console.log('error', err)
      }
    })
  }

  nuevoRegistro() {
    let url = this.router.url.split('/')[1];
    url = `/${url}/pacientes/nuevo`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/pacientes/${slug}/editar`;
    this.router.navigate([url])
  }
}
