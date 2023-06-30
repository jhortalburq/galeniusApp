import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor() { }

  menu: any = [
    {
      titulo: 'SUCURSALES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Sucursales', url: '/administrador/sucursales/lista' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'USUARIOS',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'ESPECIALISTAS',
      submenu: [  
                { titulo: 'Registro de Especialistas', url: '/administrador/especialistas/lista' },
                { titulo: 'Nuevo Especialista', url: '/administrador/especialistas/nuevo' },
               ]
     },
    {
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
      secciones: [
        { titulo: 'Análisis', url: '/administrador/mantenimientos/analisis-clinicos' },
        { titulo: 'Diagnósticos', url: '/administrador/mantenimientos/diagnosticos' },
        { titulo: 'Especialidades', url: '/administrador/mantenimientos/especialidades' },
        { titulo: 'Estudios de Gabinete', url: '/administrador/mantenimientos/estudios-gabinete' },
        { titulo: 'Exámenes de Laboratorio', url: '/administrador/mantenimientos/examenes-laboratorio' },
        { titulo: 'Indicaciones Médicas', url: '/administrador/mantenimientos/indicaciones-medicas' },
        { titulo: 'Medicamentos', url: '/administrador/mantenimientos/medicamentos' },
        { titulo: 'Tipos de Citas', url: '/administrador/mantenimientos/tipos-citas' },
        { titulo: 'Tipos de Evaluaciones', url: '/administrador/mantenimientos/tipos-evaluaciones' },
      ]
    },
  ];

}
