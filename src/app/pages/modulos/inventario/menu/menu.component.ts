import { Component, OnInit } from '@angular/core';
import { InventarioService, SidebarService, BreadcrumbsService } from '../../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public modulo = 'Inventario';

  constructor(
        public sidebarService: SidebarService,
        public breadcrumbService: BreadcrumbsService,
        public inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.inventarioService.menu;
    this.breadcrumbService.setModuloName(this.modulo, true, 'inventario');
    this.breadcrumbService.flag_sidebar = true;
  }

}
