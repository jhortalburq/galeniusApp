import { Component } from '@angular/core';

import { 
  BreadcrumbsService, 
  SharedService,
  ExamenesService
} from '../../../../services/services.index';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

  tab: number = 1;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public examenesService: ExamenesService,
    public sharedService: SharedService,
) { }

  ngOnInit(): void {
    this.breadcrumbService.title = 'EXÁMENES MÉDICOS OCUPACIONALES';
  }

  irTab(number) {
    this.tab = number;
  }
}
