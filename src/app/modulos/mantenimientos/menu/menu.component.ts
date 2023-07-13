import { Component } from '@angular/core';
import { MantenimientosService, SidebarService, BreadcrumbsService } from '../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public modulo = 'Administrador';

  constructor(
        public sidebarService: SidebarService,
        public mantenimientosService: MantenimientosService,
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.mantenimientosService.menu;
    this.breadcrumbService.setModuloName(this.modulo, true, 'administrador');
    // this.breadcrumbService.flag_sidebar = true;
    this.breadcrumbService.title = 'ADMINISTRADOR';
  }
}

