import { Component, OnInit } from '@angular/core';
import { SidebarService, BreadcrumbsService, SharedService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-sucursal',
  templateUrl: './seleccionar-sucursal.component.html',
  styleUrls: ['./seleccionar-sucursal.component.scss']
})
export class SeleccionarSucursalComponent {
  organizacion_seleccionada: any = {};
  sucursal_seleccionada: any = {};

  constructor(
        public sidebarService: SidebarService,
        public breadcrumbService: BreadcrumbsService,
        public sharedService: SharedService,
        public router: Router,
  ) { }

  ngOnInit() {
    this.sidebarService.menu = [];
    this.breadcrumbService.title = 'SELECCIONE SUCURSAL';
    this.breadcrumbService.flag_dropdown_empresa = true;
    this.breadcrumbService.flag_dropdown_sucursal = true;
    this.breadcrumbService.flag_sidebar = false;

    this.sharedService.getOrganizacionesUsuario().subscribe();
    this.organizacion_seleccionada = this.sharedService.getOrganizacionActivaUsuario();
    
    if (this.organizacion_seleccionada) {
      this.sharedService.getSucursalesOrganizacion(this.organizacion_seleccionada.id).subscribe();
      this.sucursal_seleccionada = this.sharedService.getSucursalActivo();
    }
  }
}
