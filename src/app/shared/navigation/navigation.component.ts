import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulosComponent } from '../modulos/modulos.component';
import { MDBModalRef, MDBModalService } from '../../../../ng-uikit-pro-standard/src/public_api';
import { BehaviorSubject } from 'rxjs';

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
  @Input() clientX;
  @Input() clientY;
  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  
  screenWidth: number;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  modalRef: MDBModalRef;

  public currentUser: any;

  organizacion_seleccionada: any = {};
  sucursal_seleccionada: any = {};

  logo_sucursal = 'assets/img/galenius_small.png';

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

    this.screenWidth$.subscribe(width => {
      this.screenWidth = width;
      console.log(this.screenWidth)
    });

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

    this.router.navigate(['/seleccionar-modulo', this.sucursal_seleccionada.id]);
    // this.el.hide();

  }

  ngOnChanges() {
    // if (this.clientX < 35 ) {
    //   this.el.show();
    // }
  }
  irInicio() {
    if (this.screenWidth <= 1440)  {
      this.el.toggle();
    }
    
    this.router.navigate(['/']);
  }
  
  hideNav() {
    if (this.screenWidth <= 1440)  {
      this.el.toggle();
    }
  }
}
