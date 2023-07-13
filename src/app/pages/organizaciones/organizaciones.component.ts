import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { MDBModalRef, MDBModalService } from '../../../../ng-uikit-pro-standard/src/public_api';

import { SharedService, NotificationsService, BreadcrumbsService } from '../../services/services.index';

import { AgregarOrganizacionComponent } from './agregar-organizacion/agregar-organizacion.component';
import { HabiltarComponent } from './habiltar/habiltar.component';
import { DeshabiltarComponent } from './deshabiltar/deshabiltar.component';

import { AgregarSucursalComponent } from '../sucursales/agregar-sucursal/agregar-sucursal.component';
import { EditarOrganizacionComponent } from './editar-organizacion/editar-organizacion.component';


@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.scss']
})
export class OrganizacionesComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  modalRef: MDBModalRef;

  displayedColumns = ['', 'Nombre', 'Módulos', 'Sucursales', 'Sucursales Multiples', 'Estado', 'Creado Por', 'Fecha Creación', ''];

  public empresas: any = [];

  filter: string;
  changeDetected: boolean = false;

  constructor(
          public sharedService: SharedService,
          public breadcrumbService: BreadcrumbsService,
          private modalService: MDBModalService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.title = 'ORGANIZACIONES';
    this.breadcrumbService.flag_dropdown_empresa = false;
    this.breadcrumbService.flag_dropdown_sucursal = false;
    // this.breadcrumbService.flag_sidebar = false;

    this.sharedService.quitarOrganizacionActivaUsuario();
    this.sharedService.quitarSucursalActivo();
  }

  ngDoCheck() {
    if (!this.changeDetected) {
        this.getData();
        this.changeDetected = true;
    }
  }

  getData(url?) {
    if (url) {
      this.sharedService.getOrganizacionesUsuarioURL(url).subscribe({
        next: (response: any) => {
                this.empresas = response.results;
                this.nextURL = response.next;
                this.prevURL = response.previous;
                this.total = response.count;
            },
          error: (error: any) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          }
        });
    } else {
        this.sharedService.getOrganizacionesUsuario().subscribe({
          next: (response: any) => {
                this.empresas = response.results;
                this.nextURL = response.next;
                this.prevURL = response.previous;
                this.total = response.count;
            },
          error: (error: any) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
          }
        });
    }
  }

  onNext(): void {
    if (!this.lastPage()){
        this.page += 1
        this.getData(this.nextURL)
    }
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.total;
  }

  onPrev(): void {
    if (this.page >1){
        this.page -= 1
        this.getData(this.prevURL)
    }
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

    this.modalRef = this.modalService.show(EditarOrganizacionComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
                  data: {
                     empresa: empresa
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

  enableOrg(empresa: any): void {
    this.modalRef = this.modalService.show(HabiltarComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
                  data: {
                    empresa: empresa
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

  disableOrg(empresa: any): void {
    this.modalRef = this.modalService.show(DeshabiltarComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-primary',
                  animated: true,
                  data: {
                    empresa: empresa
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

    this.sharedService.getOrganizacionesUsuario(filterValue).subscribe((response: any) => {
      this.empresas = response.results;
      this.nextURL = response.next;
      this.prevURL = response.previous;
      this.total = response.count;
    });
  }

  changeStatus(empresa: any) {

    this.sharedService.editOrganizacion( empresa, empresa.id ).subscribe({
       next: (response: any) => {
         if (empresa.activo) {
           this.notificationService.showInfo('Se cambio el estado ', 'Organización Activa');
         } else {
           this.notificationService.showInfo('Se cambio el estado ', 'Organización Inactiva');
         }

         this.sharedService.getOrganizacionesUsuario().subscribe();
       },
       error: (err) => console.log(err)
    })
 }

 changeFlagMultiple(empresa: any) {

     this.sharedService.editOrganizacion( empresa, empresa.id ).subscribe({
        next: (response: any) => {
          if (empresa.flag_cm_multiples) {
            this.notificationService.showInfo('Se habilitó el flag', 'Sucursales Múltiples');
          } else {
            this.notificationService.showInfo('Se deshabilitó el flag', 'Sucursales Múltiples');
          }

          this.sharedService.getOrganizacionesUsuario().subscribe();
        },
        error: (err) => console.log(err)
     })
  }

  setOrganizacion( empresa: any ) {
    localStorage.setItem('empresa', JSON.stringify(empresa));
    this.sharedService.organizacion_seleccionada = empresa;

    this.sharedService.getSucursalesOrganizacion(empresa.id).subscribe({
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
