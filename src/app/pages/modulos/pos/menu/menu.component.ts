import { Component, OnInit } from '@angular/core';
import { PosService, SidebarService, BreadcrumbsService } from '../../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public modulo = 'Punto de Venta';

  constructor(
        public sidebarService: SidebarService,
        public posService: PosService,
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.posService.menu;
    this.breadcrumbService.setModuloName(this.modulo, 'pos');
  }

}
