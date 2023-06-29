import { Component, OnInit,  } from '@angular/core';
import { SidebarService, BreadcrumbsService, EmpresaService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-modulo',
  templateUrl: './seleccionar-modulo.component.html',
  styleUrls: ['./seleccionar-modulo.component.scss']
})
export class SeleccionarModuloComponent {

  organizacion_seleccionada: any = {};
  sucursal_seleccionada: any = {};

  constructor(
        public sidebarService: SidebarService,
        public breadcrumbService: BreadcrumbsService,
        public empresaService: EmpresaService,
        public router: Router,
  ) { }

  ngOnInit() {
    this.sidebarService.menu = [];
    this.breadcrumbService.title = 'SELECCIONE MÓDULO';
    this.breadcrumbService.flag_dropdown_empresa = true;
    this.breadcrumbService.flag_dropdown_sucursal = true;
    this.breadcrumbService.flag_sidebar = false;

    this.empresaService.getOrganizacionesUsuario().subscribe();
    this.organizacion_seleccionada = this.empresaService.getOrganizacionActivaUsuario();

    if (this.organizacion_seleccionada) {
      this.empresaService.getSucursalesOrganizacion(this.organizacion_seleccionada.id).subscribe();
      this.sucursal_seleccionada = this.empresaService.getSucursalActivo();
    }
  }

  irModulo(modulo: string) {
    localStorage.setItem('last_modulo', modulo);
    this.router.navigate(['/' + modulo, 'menu']);
  }
}
