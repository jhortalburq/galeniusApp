import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { 
  BreadcrumbsService, 
  SharedService,
  AdmisionService
} from '../../../../services/services.index';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
  orden_slug: string = '';
  tab: number = 1;

  orden: any = {};

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public admisionService: AdmisionService,
    public sharedService: SharedService,
    private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    this.orden_slug = this.route.snapshot.paramMap.get('orden_slug');

    this.breadcrumbService.title = 'EXÁMENES MÉDICOS OCUPACIONALES';
    this.getRegistro();
  }

  getRegistro() {
    this.admisionService.getResumenAtencion(this.orden_slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
                          .subscribe((res: any) => {
                              this.orden = res;
                          })
                        }

  irTab(number) {
    this.tab = number;
  }

  updateLaboral(action: any) {
    this.getRegistro();
  }
}
