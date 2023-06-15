import { Component, OnInit } from '@angular/core';
import { AdministradorService, SidebarService, BreadcrumbsService } from '../../../services/services.index';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  constructor(
        public breadcrumbService: BreadcrumbsService,
        public sidebarService: SidebarService,
        public administradorService: AdministradorService,
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.administradorService.menu;
  }

}
