import { Component } from '@angular/core';
import { OcupacionalService, SidebarService, BreadcrumbsService } from '../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public modulo = 'Ocupacional';

  constructor(
        public sidebarService: SidebarService,
        public ocupacionalService: OcupacionalService,
        public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.ocupacionalService.menu;
    this.breadcrumbService.setModuloName(this.modulo, true, 'ocupacional');
    // this.breadcrumbService.flag_sidebar = true;
    this.breadcrumbService.title = 'OCUPACIONAL';
  }
}

