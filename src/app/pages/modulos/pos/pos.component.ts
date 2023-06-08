import { Component, OnInit } from '@angular/core';
import { PosService, SidebarService } from '../../../services/services.index';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  constructor(
        public sidebarService: SidebarService,
        public posService: PosService
  ) { }

  ngOnInit() {
    this.sidebarService.menu = this.posService.menu;
  }

}
