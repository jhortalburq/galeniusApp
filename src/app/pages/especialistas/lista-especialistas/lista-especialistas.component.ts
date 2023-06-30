import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { BreadcrumbsService, EspecialistasService, SharedService } from '../../../services/services.index';


@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    '',
    'N° Colegiatura',
    'Nombre Completo', 
    'Tipo Documento',
    'N° Documento',
    'Edad', 
    'Nacionalidad',
    'Especialidades',
    'Creado Por',
    'Fecha Creación',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      public breadcrumbService: BreadcrumbsService,
      public sharedService: SharedService,
      public especialistaService: EspecialistasService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'REGISTRO DE ESPECIALISTAS';
  }

  getData(url?) {
    if (url) {
      this.especialistaService.getEspecialistasURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
        next: (response: any) => {
                this.registros = response.results;
                this.nextURL = response.next;
                this.prevURL = response.previous;
                this.total = response.count;
            },
          error: (error: any) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          }
        });
    } else {
        this.especialistaService.getEspecialistas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
          next: (response: any) => {
                this.registros = response.results;
                this.nextURL = response.next;
                this.prevURL = response.previous;
                this.total = response.count;
            },
          error: (error: any) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          }
        });
    }
  }

  onNext(): void {
    if (!this.lastPage()){
        this.page += 1
        this.getData(this.nextURL)
    }
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.total;
  }

  onPrev(): void {
    if (this.page >1){
        this.page -= 1
        this.getData(this.prevURL)
    }
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
