import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public modulo = 'Administrador';

  constructor(
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setModuloName(this.modulo, true, 'administrador');
  }

}
