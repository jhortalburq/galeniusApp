import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarService, AsistencialService, OcupacionalService, MantenimientosService
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
              public asistencialService: AsistencialService,
              public ocupacionalService: OcupacionalService,
              public mantenimientosService: MantenimientosService
  ) { }

  ngOnInit(): void {

    if (this.router.url.includes("asistencial")) {
      this.sidebarService.menu = this.asistencialService.menu;
    } else  if (this.router.url.includes("ocupacional")) {
      this.sidebarService.menu = this.ocupacionalService.menu;
    } else  if (this.router.url.includes("administrador")) {
      this.sidebarService.menu = this.mantenimientosService.menu;
    }

  }

}
