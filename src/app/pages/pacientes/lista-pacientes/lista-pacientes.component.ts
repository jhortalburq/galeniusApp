import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { BreadcrumbsService, PacientesService, SharedService } from '../../../services/services.index';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  pacientes: any = [];

  modalRef: MDBModalRef;

  displayedColumns = [
    '',
    'Nombre Completo', 
    'Tipo Documento',
    'N° Documento',
    'Edad', 
    'Género',
    'Empresa',
    'Email',
    'Telefono',
    'Nacionalidad',
    'Creado Por',
    'Fecha Creación',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      public breadcrumbService: BreadcrumbsService,
      public pacienteService: PacientesService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'REGISTRO DE PACIENTES';
  }

  getData(url?) {
    if (url) {
      this.pacienteService.getPacientesURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
        next: (response: any) => {
                this.pacientes = response.results;
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
        this.pacienteService.getPacientes(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
          next: (response: any) => {
                this.pacientes = response.results;
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
    url = `/${url}/pacientes/nuevo`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/pacientes/${slug}/editar`;
    this.router.navigate([url])
  }
}
