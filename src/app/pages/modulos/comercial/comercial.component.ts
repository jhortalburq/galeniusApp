import { Component, OnInit } from '@angular/core';
import { ComercialService, SidebarService } from '../../../services/services.index';

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.scss']
})
export class ComercialComponent implements OnInit {

  constructor(
        public sidebarService: SidebarService,
        public comercialService: ComercialService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.comercialService.menu;
  }

}
