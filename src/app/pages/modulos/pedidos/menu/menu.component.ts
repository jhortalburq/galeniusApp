import { Component, OnInit } from '@angular/core';
import { PedidosService, SidebarService,  BreadcrumbsService } from '../../../../services/services.index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public modulo = 'Pedidos';

  constructor(
        public sidebarService: SidebarService,
        public pedidoService: PedidosService,
      public breadcrumbService: BreadcrumbsService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.pedidoService.menu;
    this.breadcrumbService.setModuloName(this.modulo, 'pedidos');
  }

}
