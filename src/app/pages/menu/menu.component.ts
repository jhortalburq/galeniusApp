import { Component, OnInit } from '@angular/core';
import { SidebarService, BreadcrumbsService } from '../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public modulo = 'SELECCIONE MÓDULO';

  // public last_modulo: string | null = '';

  constructor(
        public sidebarService: SidebarService,
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = [];
    this.breadcrumbService.setModuloName(this.modulo, false);
  }
}
