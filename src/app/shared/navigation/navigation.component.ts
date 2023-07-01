import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulosComponent } from '../modulos/modulos.component';
import { MDBModalRef, MDBModalService } from '../../../../ng-uikit-pro-standard/src/public_api';

import {
  SidebarService,
  AuthService,
  AlertService,
  SharedService,
  BreadcrumbsService,
} from '../../services/services.index';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public el: any;

  modalRef: MDBModalRef;

  public currentUser: any;

  organizacion_seleccionada: any = {};
  sucursal_seleccionada: any = {};

  modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-frame modal-top',
      animated: true
  };

  constructor(
          public breadcrumbService: BreadcrumbsService,
          public sidebarService: SidebarService,
          private modalService: MDBModalService,
          public sharedService: SharedService,
          public alertService: AlertService,
          public route: ActivatedRoute,
          public authService: AuthService,
          public router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.breadcrumbService.modulo = localStorage.getItem('last_modulo');

    this.sharedService.getOrganizacionesUsuario().subscribe();
    this.organizacion_seleccionada = this.sharedService.getOrganizacionActivaUsuario();

    if (this.organizacion_seleccionada) {
      this.sharedService.getSucursalesOrganizacion(this.organizacion_seleccionada.id).subscribe();
      this.sucursal_seleccionada = this.sharedService.getSucursalActivo();
    }
  }


  openModal() {
    this.modalRef = this.modalService.show(ModulosComponent, this.modalOptions);
  }

  setEmpresa( empresa: any ) {
    localStorage.setItem('empresa', JSON.stringify(empresa));
    this.sharedService.organizacion_seleccionada = empresa;
    this.organizacion_seleccionada = empresa;

    this.sharedService.getSucursalesOrganizacion(empresa.id).subscribe(response => {
        this.sharedService.sucursal_seleccionada = {
                  razon_social: null,
                  id: null
        };
    });
  }

  setSucursal( sucursal: any ) {
    localStorage.setItem('cm', JSON.stringify(sucursal));
    this.sharedService.sucursal_seleccionada = sucursal;
    this.sucursal_seleccionada = sucursal;
    this.alertService.successSwalToast(`${this.sucursal_seleccionada.razon_social}`, 1000);

    this.router.navigate(['/seleccionar-modulo']);
    this.el.hide();

  }

  irInicio() {
    this.el.hide();
    this.router.navigate(['/']);
  }
}
