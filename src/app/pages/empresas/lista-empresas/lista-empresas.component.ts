import { Component, OnInit } from '@angular/core';
import { 
  SharedService, 
  EmpresasService, 
  NotificationsService,
  BreadcrumbsService
} from '../../../services/services.index';

import { Router } from '@angular/router';



@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})

export class ListaEmpresasComponent implements OnInit {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  displayedColumns = ['', 'Razón Social', 'RUC', 'Dirección', 'Rubro', 'Ubigeo', ''];

  public empresas: any = [];

  filter: string;

  constructor(
          public sharedService: SharedService,
          public notificationService: NotificationsService,
          public empresaService: EmpresasService,
          public breadcrumbService: BreadcrumbsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.title = 'REGISTRO DE EMPRESAS';
    this.getData();
  }

  getData(url?) {
    if (url) {
      this.empresaService.getEmpresasURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
        next: (response: any) => {
                this.empresas = response.results;
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
        this.empresaService.getEmpresas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
          next: (response: any) => {
                this.empresas = response.results;
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

  nuevoRegistro() {
    let url = this.router.url.split('/')[1];
    url = `/${url}/empresas/nuevo`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/empresas/${slug}/editar`;
    this.router.navigate([url])
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

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.empresaService.getEmpresas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, filterValue).subscribe((response: any) => {
      this.empresas = response.results;
      this.nextURL = response.next;
      this.prevURL = response.previous;
      this.total = response.count;
    });
  }
}
