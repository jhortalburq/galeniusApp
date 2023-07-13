import { Component, ViewChild } from '@angular/core';
import { SharedService, BreadcrumbsService, ProfileService, SidebarService} from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    public sharedService: SharedService,
    public breadcrumbService: BreadcrumbsService,
    public profileService: ProfileService,
    public sidebarService: SidebarService,
    private router: Router
) { }

  ngOnInit(): void {
    this.breadcrumbService.title = '';
    this.breadcrumbService.flag_dropdown_empresa = false;
    this.breadcrumbService.flag_dropdown_sucursal = false;
    // this.breadcrumbService.flag_sidebar = false;

    this.sharedService.quitarOrganizacionActivaUsuario();
    this.sharedService.quitarSucursalActivo();

    this.sidebarService.menu = [];

    this.checkProfile();
  }

  checkProfile() {
    this.profileService.getTypeProfile().subscribe({
      next: (response: any) => {
          response.forEach( (user: any) => {
            if (user.is_superuser) {
              this.router.navigate(['/organizaciones'])
            } else if (user.is_admin) {
              this.router.navigate(['/seleccionar-sucursal'])
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
