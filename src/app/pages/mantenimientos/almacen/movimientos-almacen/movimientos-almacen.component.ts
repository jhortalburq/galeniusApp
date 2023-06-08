import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { SharedService, AlmacenService, EmpresaService, MantenimientoService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-movimientos-almacen',
  templateUrl: './movimientos-almacen.component.html',
  styleUrls: ['./movimientos-almacen.component.scss']
})
export class MovimientosAlmacenComponent implements OnInit {
  @Input() registro;
  @Output() submitChange = new EventEmitter();
  
  content: any;

  registros: any = [];

  entradas: any = [];
  salidas: any = [];
  
  filterEntrada: string;
  filterSalida: string;

  itemsCopyS: Array<any>;
  itemsCopyE: Array<any>;

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public almacenService: AlmacenService,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.mantenimientoService.getQueryset('movimientos-almacen').subscribe((res: any) => {
        this.registros = res.results.filter( (item: any) => item.activo === true)
        this.getMovimientosAlmacen();
    })
  }

  getMovimientosAlmacen(url?) {
    this.almacenService.getMovimientosActivosAlmacen(this.registro.id).subscribe((response: any) => {
       for (let i = 0; i < response.length; i++) {
        let index = this.registros.findIndex(x => x.id === response[i].id);

         if (index>=0) {
          this.registros[index].boolean = true;
         }
       
      }

      this.entradas = this.registros.filter( (item: any) => item.tipo === 'E')
      this.itemsCopyE = this.registros.filter( (item: any) => item.tipo === 'E')

      this.salidas = this.registros.filter( (item: any) => item.tipo === 'S')
      this.itemsCopyS = this.registros.filter( (item: any) => item.tipo === 'S')

    });
  }

  changeAsignacion(movimiento: any) {
    this.almacenService.asignarMovimientoSucursal(this.registro, movimiento).subscribe();
  }

  cerrarModal(){
    this.submitChange.emit(true);
  }

  applyFilterS(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches

    if (filterValue.length) {
        this.salidas = this.itemsCopyS.filter( (res: any) => res.descripcion.indexOf(filterValue) >= 0);
    } else {
        this.salidas = this.itemsCopyS;
    }
  }

  applyFilterE(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches

    if (filterValue.length) {
      this.entradas = this.itemsCopyE.filter( (res: any) => res.descripcion.indexOf(filterValue) >= 0);
    } else {
        this.entradas = this.itemsCopyE;
    }
  }
}
