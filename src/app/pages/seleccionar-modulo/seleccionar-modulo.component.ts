import { Component, OnInit,  OnDestroy} from '@angular/core';
import { SidebarService, BreadcrumbsService, SharedService, ProfileService } from '../../services/services.index';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seleccionar-modulo',
  templateUrl: './seleccionar-modulo.component.html',
  styleUrls: ['./seleccionar-modulo.component.scss']
})
export class SeleccionarModuloComponent {

  organizacion_seleccionada: any = {};
  sucursal_seleccionada: any = {};
  modulos: any = [];

  subscription: any;

  constructor(
        public sidebarService: SidebarService,
        public breadcrumbService: BreadcrumbsService,
        public sharedService: SharedService,
        public profileService: ProfileService,
        public router: Router,
        public route: ActivatedRoute
        ) {
          
         }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
        this.sidebarService.menu = [];
        this.breadcrumbService.title = 'SELECCIONE MÓDULO';
        this.breadcrumbService.flag_dropdown_empresa = true;
        this.breadcrumbService.flag_dropdown_sucursal = true;
        // this.breadcrumbService.flag_sidebar = false;
    
        this.sharedService.getOrganizacionesUsuario().subscribe();
        this.organizacion_seleccionada = this.sharedService.getOrganizacionActivaUsuario();
    
        if (this.organizacion_seleccionada) {
          this.sharedService.getSucursalesOrganizacion(this.organizacion_seleccionada.id).subscribe();
          this.sucursal_seleccionada = this.sharedService.getSucursalActivo();
        }
    
        this.getModulos();
    });

  }

  irModulo(modulo: string) {
    localStorage.setItem('last_modulo', modulo.toLowerCase());
    this.router.navigate(['/' + modulo.toLowerCase(), 'menu']);
  }

  getModulos() {
    this.sharedService.modulosSucursal(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe((response: any) => {
                              this.modulos = response;

                              if (!this.modulos.length) {
                                this.checkProfile()
                              }
                          });
  }

  checkProfile() {
    this.profileService.getTypeProfile().subscribe({
      next: (response: any) => {
          response.forEach( (user: any) => {
            if (user.is_superuser) {
              this.router.navigate(['/administrador/menu'])
            } else if (user.is_useruser) {
              console.log('admin')
            } else if (user.is_useruser) {
              console.log('client')
            } else if (user.is_useruser) {
              console.log('user')
            }
          });
      },
      error: (e: any) => {
      }
    })
  }
}
