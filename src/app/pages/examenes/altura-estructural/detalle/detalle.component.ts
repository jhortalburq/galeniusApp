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
  slug: string = '';
  
  tab: number = 1;

  orden: any = {};
  
  programa = 'oc';
  title = 'ALTURA ESTRUCTURAL';
  clave = 'altura-estructural';  

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public admisionService: AdmisionService,
    public sharedService: SharedService,
    private route: ActivatedRoute,
    public router: Router
) { }

  ngOnInit(): void {
    this.orden_slug = this.route.snapshot.paramMap.get('orden_slug');
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.breadcrumbService.title = this.title;
    this.getRegistro();
  }

  getRegistro() {
    this.admisionService.getResumenAtencion(this.orden_slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa)
                          .subscribe((res: any) => {
                              this.orden = res;
                          })
                        }

  irTab(number) {
    this.tab = number;
  }

  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/${this.clave}/lista`;
    this.router.navigate([url]);
  }
}