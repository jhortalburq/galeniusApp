import { Component, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-consultas',
  templateUrl: './lista-consultas.component.html',
  styleUrls: ['./lista-consultas.component.scss'],
})
export class ListaConsultasComponent {
  registros: any = [];
  modalRef: MDBModalRef;

  displayedColumns = [
    'N° Consulta', 
    'Paciente',
    'Especialista', 
    'Especialidad',
    'Fecha Atención',
    'Tipo de Cita',
    'Estado',
    'Creado',
    'Triaje',
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
    this.router.navigate(['/asistencial/especialistas/nuevo'])
  }
}
