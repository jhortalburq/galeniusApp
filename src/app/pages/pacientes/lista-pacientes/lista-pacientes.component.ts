import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'Nombre Completo', 
    'Edad', 
    'Género',
    'Tipo Documento',
    'N° Documento',
    'Fecha de Nacimiento',
    'Creado',
    '',
    ''
  ];

  constructor(
      private modalService: MDBModalService,
      private renderer: Renderer2,
      private router: Router
  ) { }

  ngOnInit(): void {
  // this.getData();
  }

  nuevoRegistro() {
    this.router.navigate(['/asistencial/pacientes/nuevo'])
  }
}
