import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { 
  BreadcrumbsService, 
  SharedService,
  ExamenesService
} from '../../../../services/services.index';

@Component({
  selector: 'app-lista-examenes',
  templateUrl: './lista-examenes.component.html',
  styleUrls: ['./lista-examenes.component.scss']
})
export class ListaExamenesComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  is_loading: boolean = false;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];

  modalRef: MDBModalRef;

  programa: string = '';

  displayedColumns = [
    '',
    'N° Ficha', 
    'Paciente',
    'Fecha Atención', 
    'Empresa',
    'Tipo Evaluación',
    'Estado',
    'Modificó',
    'Ult. Modificación',
    '',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      public breadcrumbService: BreadcrumbsService,
      public examenesService: ExamenesService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(url?) {
    if (url) {
      this.examenesService.getExamenesURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc').subscribe({
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
        this.examenesService.getExamenes(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', 'emo').subscribe({
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

  detalleRegistro(slug: string) {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/detalle`;
    this.router.navigate([url]);
  }
}
