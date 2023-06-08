import { Component, OnInit } from '@angular/core';
import { PedidosService, SidebarService } from '../../../services/services.index';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(
        public sidebarService: SidebarService,
        public pedidoService: PedidosService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.pedidoService.menu;
  }

}
