import { Component, OnInit } from '@angular/core';
import { ComercialService, SidebarService, BreadcrumbsService } from '../../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public modulo = 'Comercial';

  constructor(
        public sidebarService: SidebarService,
        public comercialService: ComercialService,
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.comercialService.menu;
    this.breadcrumbService.setModuloName(this.modulo, true, 'comercial');
    this.breadcrumbService.flag_sidebar = true;
  }

}
