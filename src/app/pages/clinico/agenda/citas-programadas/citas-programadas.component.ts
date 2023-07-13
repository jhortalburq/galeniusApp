import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { 
  BreadcrumbsService, 
  SharedService,
  CitasService
} from '../../../../services/services.index';


@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.scss']
})
export class CitasProgramadasComponent implements OnInit{
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  title = 'CITAS PROGRAMADAS';

  is_loading: boolean = false;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];

  modalRef: MDBModalRef;

  displayedColumns = [
    '',
    'Nombre Completo', 
    'Tipo de Cita',
    'Especialista',
    'Fecha',
    'Hora Inicio',
    'Hora Inicio',
    'Pagado',
    'Costo Cita',
    'Saldo',
    'Creado',
    ''
  ];

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public citasService: CitasService,
    public sharedService: SharedService,
    private router: Router
) { }


  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = this.title;
  }

  getData(url?) {
    if (url) {
      this.citasService.getCitasProgramadasURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
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
        this.citasService.getCitasProgramadas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id).subscribe({
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



}
