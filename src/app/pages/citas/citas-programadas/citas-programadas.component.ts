import { Component } from '@angular/core';

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.scss']
})
export class CitasProgramadasComponent {
  displayedColumns = [
    'Nombre Completo', 
    'N° Documento',
    'Edad', 
    'Tipo de Cita',
    'Especialista',
    'Especialidad',
    'Fecha Cita',
    'Hora Inicio',
    'Hora Fin',
    'Estado',
    'Creado',
    ''
  ];
  public registros: any = [];

}
