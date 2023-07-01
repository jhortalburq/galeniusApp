import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from '../../../../ng-uikit-pro-standard/src/public_api';

import { SharedService } from '../../services/services.index';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})

export class ModulosComponent implements OnInit {
  modulos: any = [];

  constructor(
        public modalRef: MDBModalRef,
        public router: Router,
        public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getModulos();
  }

  getModulos() {
    this.sharedService.modulosSucursal(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe((response: any) => {
                            this.modulos = response;
                          });
  }

  irModulo(modulo: string) {
      localStorage.setItem('last_modulo', modulo.toLowerCase());
      this.router.navigate(['/' + modulo.toLowerCase(), 'menu']);
      this.modalRef.hide();
  }


}
