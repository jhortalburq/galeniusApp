import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2 } from '@angular/core';

import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { NotificationsService } from '../../../services/notifications.service';

import { UsuariosService } from '../../../services/services.index';

import { AgregarUsuariosComponent } from '../agregar-usuarios/agregar-usuarios.component';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})

export class ListaUsuariosComponent implements OnInit {
  modalRef: MDBModalRef;

  displayedColumns = ['Apellidos', 'Nombres', 'Email','Administrador', 'Última Sesión',  'Activo'];

  public usuarios: any = [];

  filter: string;

  constructor(
          private modalService: MDBModalService,
          public usuarioService: UsuariosService,
          private renderer: Renderer2,
          public notificationService: NotificationsService,
          private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(url?) {
    this.usuarioService.getUsuarios().subscribe(
      (response: any) => {
        this.usuarios = response.results;
      },
      (error: any) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(AgregarUsuariosComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-dialog modal-notify modal-danger ',
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

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    this.usuarioService.getUsuarios(filterValue).subscribe((response: any) => {
      this.usuarios = response.results;
    });
  }

  changeAdmin(usuario: any) {

     this.usuarioService.editsuario( usuario, usuario.id ).subscribe(
          (response) => {

               if (usuario.is_superuser) {
                  this.notificationService.showInfo('Se cambio el Rol del Usuario', 'Usuario Administrador');
                } else {
                  this.notificationService.showInfo('Se cambio el Rol del Usuario', 'Usuario no Administrador');
                }

                this.usuarioService.getUsuarios().subscribe();

            },
            err => {
                usuario.is_superuser = true

                  Swal.fire({
                      title: 'Error!',
                      text: err.error,
                      icon: 'error',
                      confirmButtonText: 'Cerrar'
                    });
            }
        );
  }

  changeStatus(usuario: any) {

     this.usuarioService.editsuario( usuario, usuario.id ).subscribe(
          (response) => {

               if (usuario.is_active) {
                  this.notificationService.showInfo('Se cambio el estado del Usuario', 'Usuario Activo');
                } else {
                  this.notificationService.showInfo('Se cambio el estado del Usuario', 'Usuario Inactivo');
                }

                this.usuarioService.getUsuarios().subscribe();

            },
            err => {
                usuario.is_active = true

                  Swal.fire({
                      title: 'Error!',
                      text: err.error,
                      icon: 'error',
                      confirmButtonText: 'Cerrar'
                    });
            }
        );
  }

}
