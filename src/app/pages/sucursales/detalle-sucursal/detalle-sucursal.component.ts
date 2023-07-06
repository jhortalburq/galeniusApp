import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService, BreadcrumbsService, MantenimientoService, NotificationsService} from '../../../services/services.index';
import { TabsetComponent } from '../../../../../ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';

import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-sucursal',
  templateUrl: './detalle-sucursal.component.html',
  styleUrls: ['./detalle-sucursal.component.scss']
})
export class DetalleSucursalComponent implements OnInit {
  @ViewChild('staticTabs', { static: true }) staticTabs: TabsetComponent;

  sucursal_id: any;
  registro: any = {};

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
    this.getRegistro();
  }


  getRegistro() {
      this.mantenimientoService.getSucursal(this.sucursal_id, this.sharedService.organizacion_seleccionada.id)
      .subscribe({                                                                        
        next: (res: any) => {
          this.registro = res;
        }
      })
  }

  regresar(): void {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/sucursales/lista`;
    this.router.navigate([url]);
  }

  onEditSucursal(registro) {
    this.getRegistro();
  }

}
