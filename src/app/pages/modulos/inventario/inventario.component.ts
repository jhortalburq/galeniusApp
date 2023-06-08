import { Component, OnInit } from '@angular/core';
import { InventarioService, SidebarService } from '../../../services/services.index';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  constructor(
        public sidebarService: SidebarService,
        public inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.inventarioService.menu;
  }

}
