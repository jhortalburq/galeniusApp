import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulosComponent } from '../../modals/modulos/modulos.component';
import { MDBModalRef, MDBModalService } from '../../../../ng-uikit-pro-standard/src/public_api';
import Swal from 'sweetalert2'
import {map} from 'rxjs/operators';

import {
  SidebarService,
  EmpresaService,
  BreadcrumbsService,
  AlmacenService
} from '../../services/services.index';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  modalRef: MDBModalRef;

  username: string | null;

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
          public empresaService: EmpresaService,
          public sucursalService: AlmacenService,
          public route: ActivatedRoute,
          public router: Router
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.empresaService.getEmpresasUsuario().subscribe();

    this.empresaService.getEmpresaActivaUsuario().subscribe((res: any) => {
      this.empresaService.empresa_seleccionada = res;
      
      if (res.id) {
        this.sucursalService.getSucursalesUsuario(res.id).subscribe();

        this.sucursalService.getSucursalActivaUsuario(res.id).subscribe((suc: any) => {
            this.sucursalService.sucursal_seleccionada = suc;
        });

      }

    });


    // if (JSON.parse(localStorage.getItem('empresa'))) {
    //   console.log('json');
    //   this.empresaService.empresa_seleccionada = JSON.parse(localStorage.getItem('empresa'));

    // };


    // if (JSON.parse(localStorage.getItem('sucursal'))) {
    //   this.sucursalService.sucursal_seleccionada = JSON.parse(localStorage.getItem('sucursal'));
    // }

  }


  openModal() {
    this.modalRef = this.modalService.show(ModulosComponent, this.modalOptions);
  }

  setEmpresa( empresa: any) {
    this.empresaService.setEmpresaActivaUsuario(empresa).subscribe();

    this.empresaService.empresa_seleccionada = empresa;
    // localStorage.setItem('empresa', JSON.stringify(empresa));

    Swal.fire({
        title: 'Cambio de Empresa',
        text: 'Se ingreso a la Empresa ' + this.empresaService.empresa_seleccionada.razon_social,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    });

    this.sucursalService.getSucursalesUsuario(empresa.id).subscribe(response => {
      // localStorage.removeItem('sucursal');
        this.sucursalService.sucursal_seleccionada = {
                  nombre_sucursal: null,
                  id: null
        };
    });

     if (localStorage.getItem('last_modulo')) {
          this.router.navigate(['/' + localStorage.getItem('last_modulo'), 'menu']);
      } else {
          this.router.navigate(['/menu']);
      }
  }

  setSucursal( sucursal: any) {
    this.sucursalService.setSucursalActivaUsuario(sucursal, this.empresaService.empresa_seleccionada.id).subscribe();

    this.sucursalService.sucursal_seleccionada = sucursal;
    // localStorage.setItem('sucursal', JSON.stringify(sucursal));

    Swal.fire({
        title: 'Cambio de Sucursal',
        text: 'Se ingreso a la Sucursal ' + this.sucursalService.sucursal_seleccionada.nombre_sucursal,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    });


     if (localStorage.getItem('last_modulo')) {
          this.router.navigate(['/' + localStorage.getItem('last_modulo'), 'menu']);
      } else {
          this.router.navigate(['/menu']);
      }
  }
}
