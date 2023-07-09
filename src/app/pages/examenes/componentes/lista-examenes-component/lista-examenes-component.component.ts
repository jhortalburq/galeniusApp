import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { 
  BreadcrumbsService, 
  SharedService,
  ExamenesService
} from '../../../../services/services.index';

@Component({
  selector: 'app-lista-examenes-component',
  templateUrl: './lista-examenes-component.component.html',
  styleUrls: ['./lista-examenes-component.component.scss']
})
export class ListaExamenesComponentComponent {
  @Input() registros;
  @Input() page;
  @Input() perPage;
  @Input() total;
  @Input() examen;

  @Output() nextPage = new EventEmitter();
  @Output() prevPage = new EventEmitter();
  @Output() searchSubmit = new EventEmitter();

  is_loading: boolean = false;


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
      public breadcrumbService: BreadcrumbsService,
      public examenesService: ExamenesService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  
  onNext(): void {
    this.nextPage.emit();
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.total;
  }

  onPrev(): void {
    this.prevPage.emit();
  }

  detalleRegistro(slug: string) {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/${this.examen}/${slug}/detalle`;
    this.router.navigate([url]);
  }

  onSearchSubmit(query: any){
    console.log('aaaaa', query)
    this.searchSubmit.emit(query)
  }
}
