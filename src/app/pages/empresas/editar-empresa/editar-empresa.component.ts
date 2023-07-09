import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BreadcrumbsService, 
        MantenimientoService, 
        EmpresasService,
        SharedService,
        AlertService
} from '../../../services/services.index';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})

export class EditarEmpresaComponent implements OnInit {
  registro: any = {};
  empresa_id: any;

  disabled: boolean = false;

  constructor(
    public sharedService: SharedService,
    public mantenimientoService: MantenimientoService,
    public empresaService: EmpresasService,
    public alertService: AlertService,
    public breadcrumbService: BreadcrumbsService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.empresa_id = this.route.snapshot.paramMap.get('empresa_id');
    this.breadcrumbService.title = 'EDITAR PACIENTE';
    this.getRegistro();
  }

  getRegistro() {
    this.empresaService.getEmpresa(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.empresa_id )
    .subscribe({                                                                        
      next: (res: any) => {
        this.registro = res;
      }
    })
  }


}
