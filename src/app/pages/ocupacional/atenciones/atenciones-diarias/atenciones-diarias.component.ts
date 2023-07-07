import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, AdmisionService, SharedService } from '../../../../services/services.index';

@Component({
  selector: 'app-atenciones-diarias',
  templateUrl: './atenciones-diarias.component.html',
  styleUrls: ['./atenciones-diarias.component.scss']
})
export class AtencionesDiariasComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];

  displayedColumns = [
    '',
    'Nro Orden',
    'Paciente',
    'Empresa',
    'Fecha de Atención', 
    'Tipo de Evaluación',
    'Hoja de Ruta',
    'Consent. Inf',
    'Estado',
    'Creado Por',
    'Ult Modificación',
    ''
  ];

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public admisionService: AdmisionService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'ATENCIONES DIARIAS';
  }

  getData(url?) {
    if (url) {
      this.admisionService.getAtencionesURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
              .subscribe({
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
                this.admisionService.getAtenciones(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc').subscribe({
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
    url = `/${url}/admision/nueva-atencion`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/admision/${slug}/editar`;
    this.router.navigate([url])
  }
}
