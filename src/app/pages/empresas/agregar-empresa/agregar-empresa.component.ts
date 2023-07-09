import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  SharedService,
  MantenimientoService, 
  EmpresasService, 
  AlertService,
  NotificationsService,
  BreadcrumbsService
} from '../../../services/services.index';


@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.scss']
})
export class AgregarEmpresaComponent implements OnInit {
  registro: any = {};
  slug: any;

  disabled: boolean = false;

  constructor(
    public sharedService: SharedService,
    public notificationService: NotificationsService,
    public mantenimientoService: MantenimientoService,
    public empresaService: EmpresasService,
    public alertService: AlertService,
    public breadcrumbService: BreadcrumbsService,
      public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.title = 'NUEVA EMPRESA';
  }


}
