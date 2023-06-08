import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { SharedService, AlmacenService, EmpresaService, MantenimientoService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-empresas-almacen',
  templateUrl: './empresas-almacen.component.html',
  styleUrls: ['./empresas-almacen.component.scss']
})
export class EmpresasAlmacenComponent implements OnInit {
  @Input() registro;
  @Output() submitChange = new EventEmitter();
  
  content: any;

  registros: any = [];

  filter: string;

  itemsCopy: Array<any>;

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public almacenService: AlmacenService,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.empresaService.getEmpresasUsuario().subscribe((res: any) => {
        this.registros = res.results;
        this.itemsCopy = res.results;
        this.getUsuariosAlmacen();
    })
  }

  getUsuariosAlmacen(url?) {
    this.almacenService.getEmpresasActivosAlmacen(this.registro.id).subscribe((response: any) => {
       for (let i = 0; i < response.length; i++) {
        let index = this.registros.findIndex(x => x.id === response[i].id);

         if (index>=0) {
          this.registros[index].boolean = true;
         }
      }
    });
  }

  changeAsignacion(empresa: any) {
    this.almacenService.asignarEmpresaSucursal(this.registro, empresa).subscribe();
  }

  cerrarModal(){
    this.submitChange.emit(true);
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches

    if (filterValue.length) {
        this.registros = this.itemsCopy.filter( (res: any) => res.razon_social.indexOf(filterValue) >= 0);
    } else {
        this.registros = this.itemsCopy;
    }
  }
}
