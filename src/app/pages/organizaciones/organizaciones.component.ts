import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { MDBModalRef, MDBModalService } from '../../../../ng-uikit-pro-standard/src/public_api';

import { EmpresaService, NotificationsService, BreadcrumbsService } from '../../services/services.index';

import { AgregarOrganizacionComponent } from './agregar-organizacion/agregar-organizacion.component';
import { DetalleOrganizacionComponent } from './detalle-organizacion/detalle-organizacion.component';

import { AgregarSucursalComponent } from '../mantenimientos/sucursales/agregar-sucursal/agregar-sucursal.component';


@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.scss']
})
export class OrganizacionesComponent {
  modalRef: MDBModalRef;

  displayedColumns = ['', 'Nombre', 'Módulos', 'Sucursales Multiples', 'Activo', ''];

  public empresas: any = [];

  filter: string;

  constructor(
          public empresaService: EmpresaService,
          public breadcrumbService: BreadcrumbsService,
          private modalService: MDBModalService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();

    this.breadcrumbService.title = 'ORGANIZACIONES';
    this.breadcrumbService.flag_dropdown_empresa = false;
    this.breadcrumbService.flag_dropdown_sucursal = false;
    this.breadcrumbService.flag_sidebar = false;

    this.empresaService.quitarEmpresaActivaUsuario();
    this.empresaService.quitarSucursalActivo();

    // this.modalService.open.subscribe(() => console.log('open'));
    // this.modalService.opened.subscribe(() => console.log('opened'));
    // this.modalService.close.subscribe(() => console.log('close'));
    // this.modalService.closed.subscribe(() => console.log('closed'));

  }

  getData(url?) {
    this.empresaService.getEmpresasUsuario().subscribe({
        next: (response: any) => {
          console.log(response.results)
              this.empresas = response.results;
        },
        error: (e: any) => {
          if (e.status === 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(AgregarOrganizacionComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
              });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      if (result) {
        this.getData();
        this.filter = '';
      }
    });
  }

  editModal(empresa: any): void {

    this.modalRef = this.modalService.show(DetalleOrganizacionComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog cascading-modal ',
                  animated: true,
                  data: {
                      content: { empresa: empresa}
                  }
              }
    );

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      if (result) {
        this.getData();
        this.filter = '';
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.empresaService.getEmpresasUsuario(filterValue).subscribe((response: any) => {
      this.empresas = response.results;
    });
  }

  changeStatus(empresa: any) {

     this.empresaService.editEmpresa( empresa, empresa.id ).subscribe(
          (response) => {
            if (empresa.activo) {
                  this.notificationService.showInfo('Se cambio el estado ', 'Empresa Activa');
                } else {
                  this.notificationService.showInfo('Se cambio el estado ', 'Empresa Inactiva');
                }

            this.empresaService.getEmpresasUsuario().subscribe();

            },
            err => {
                  console.log(err);
            }
        );
  }

  setOrganizacion( empresa: any ) {
    localStorage.setItem('empresa', JSON.stringify(empresa));
    this.empresaService.empresa_seleccionada = empresa;

    this.empresaService.getSucursalesEmpresa(empresa.id).subscribe({
      next: (res: any) => {
        if(!res.length) {
          this.crearSucursal(empresa.id);
        } else {
          this.router.navigate(['/seleccionar-sucursal'])
        }
      }
    });
  }

  crearSucursal( empresa_id: number ) {
    console.log('ss', empresa_id)
    this.modalRef = this.modalService.show(AgregarSucursalComponent, {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: false,
          ignoreBackdropClick: false,
          class: 'modal-dialog modal-notify modal-primary',
          animated: true,
          data: {
             empresa_id: empresa_id
          }
      });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
        if (result) {
          this.router.navigate(['/seleccionar-sucursal'])
        }
    });
  }
}
