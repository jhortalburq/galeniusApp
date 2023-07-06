import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, ProtocolosService, SharedService } from '../../../services/services.index';

@Component({
  selector: 'app-lista-protocolos',
  templateUrl: './lista-protocolos.component.html',
  styleUrls: ['./lista-protocolos.component.scss']
})
export class ListaProtocolosComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];

  displayedColumns = [
    '',
    'Código',
    'Nombre Protocolo', 
    'Empresa', 
    'Tipo de Evaluación',
    'Creado Por',
    'Fecha Creación',
    ''
  ];

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public protocoloService: ProtocolosService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'REGISTROS DE PROTOCOLOS';
  }

  getData(url?) {
    if (url) {
      this.protocoloService.getProtocolosURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
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
        this.protocoloService.getProtocolos(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
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
    url = `/${url}/protocolos/nuevo`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/protocolos/${slug}/editar`;
    this.router.navigate([url])
  }
}
