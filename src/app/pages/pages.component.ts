import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarioService, SidebarService, PosService,
        PedidosService, ComercialService, AdministradorService
} from '../services/services.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public el: any;

  constructor( public router: Router,
              public sidebarService: SidebarService,
              public posService: PosService,
              public pedidoService: PedidosService,
              public administradorService: AdministradorService,
              public comercialService: ComercialService,
              public inventarioService: InventarioService
  ) { }

  ngOnInit(): void {

    if (this.router.url.includes("pos")) {
      this.sidebarService.menu = this.posService.menu;
    } else  if (this.router.url.includes("comvercial")) {
      this.sidebarService.menu = this.comercialService.menu;
    } else  if (this.router.url.includes("pedido")) {
      this.sidebarService.menu = this.pedidoService.menu;
    } else  if (this.router.url.includes("inventario")) {
      this.sidebarService.menu = this.inventarioService.menu;
    } else  if (this.router.url.includes("administrador")) {
      this.sidebarService.menu = this.administradorService.menu;
    }

  }

}
