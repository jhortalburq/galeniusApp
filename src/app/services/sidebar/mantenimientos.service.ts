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
        { titulo: 'Sucursales', url: '/administrador/sucursales/' },
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
      titulo: 'PACIENTES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'ESPECIALISTAS',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'EMPRESAS',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
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
        { titulo: 'Grupos de Laboratorio', url: '/administrador/mantenimientos/grupos-laboratorio' },
        { titulo: 'Indicaciones Médicas', url: '/administrador/mantenimientos/indicaciones-medicas' },
        { titulo: 'Medicamentos', url: '/administrador/mantenimientos/medicamentos' },
        { titulo: 'Tipos de Citas', url: '/administrador/mantenimientos/tipos-citas' },
        { titulo: 'Tipos de Evaluaciones', url: '/administrador/mantenimientos/tipos-evaluaciones' },
      ]
    },
  ];

}
