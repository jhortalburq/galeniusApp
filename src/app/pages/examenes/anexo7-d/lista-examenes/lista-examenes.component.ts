import { Component, OnInit } from '@angular/core';
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

  programa = 'oc';
  clave = 'anexo-7D';
  title = 'ANEXO 7D';
  examen: string = 'anexo-7D';

  is_loading: boolean = false;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];


  constructor(
      public breadcrumbService: BreadcrumbsService,
      public examenesService: ExamenesService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = this.title;
  }

  getData(url?) {
    if (url) {
      this.examenesService.getExamenesURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa).subscribe({
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
        this.examenesService.getExamenes(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa, this.clave).subscribe({
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

  onSearchFilter(search: any) {
    this.registros.push(search)
  }

}
