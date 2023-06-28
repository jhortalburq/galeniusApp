import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { BreadcrumbsService, EspecialistasService } from '../../../services/services.index';


@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent {
  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'N° Colegiatura',
    'Nombre Completo', 
    'Tipo Documento',
    'N° Documento',
    'Edad', 
    'Nacionalidad',
    'Especialidades',
    'Creado',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      public breadcrumbService: BreadcrumbsService,
      public especialistaService: EspecialistasService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'REGISTRO DE ESPECIALISTAS';
  }

  getData() {
    this.especialistaService.getEspecialistas().subscribe({
      next: (res: any) => {
        this.registros = res.results;
      },
      error: (err: any) => {
        console.log('error', err)
      }
    })
  }


  nuevoRegistro() {
    let url = this.router.url.split('/')[1];
    url = `/${url}/especialistas/nuevo`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/especialistas/${slug}/editar`;
    this.router.navigate([url])
  }
}
