import { Component, OnInit } from '@angular/core';
import { SharedService, BreadcrumbsService, MantenimientoService, NotificationsService} from '../../../services/services.index';

import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-sucursal',
  templateUrl: './detalle-sucursal.component.html',
  styleUrls: ['./detalle-sucursal.component.scss']
})
export class DetalleSucursalComponent implements OnInit {
  sucursal_id: any;

  content: any;
  action: Subject<any> = new Subject();

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public sharedService: SharedService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.sucursal_id = this.route.snapshot.paramMap.get('sucursal_id');
    this.breadcrumbService.title = 'SUCURSALES';
  }

  regresar(): void {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/sucursales/lista`;
    this.router.navigate([url]);
  }

  onEditSucursal(registro) {
    console.log(registro)
  }

}
