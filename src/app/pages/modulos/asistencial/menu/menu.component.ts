import { Component } from '@angular/core';
import { AsistencialService, SidebarService, BreadcrumbsService } from '../../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public modulo = 'Asistencial';

  constructor(
        public sidebarService: SidebarService,
        public asistencialService: AsistencialService,
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.asistencialService.menu;
    this.breadcrumbService.setModuloName(this.modulo, 'asistencial');
  }

}

