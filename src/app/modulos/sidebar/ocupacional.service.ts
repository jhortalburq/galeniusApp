import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcupacionalService {

  constructor() { }

  menu: any = [
    {
      titulo: 'ADMISIÓN',
      submenu: [
                    { titulo: 'Atenciones Diarias', url: '/ocupacional/pacientes/lista' },
                    { titulo: 'Registro Masivo', url: '/ocupacional/pacientes/nuevo' },
               ]
     },
    {
      titulo: 'EMPRESAS',
      submenu: [
                    { titulo: 'Registro de Empresas', url: '/ocupacional/empresas/lista' },
                    { titulo: 'Nueva Empresa', url: '/ocupacional/pacientes/nuevo' },
                    { titulo: 'Registro Masivo', url: '/ocupacional/pacientes/nuevo' },
               ]
     },
    {
      titulo: 'PACIENTES',
      submenu: [
                    { titulo: 'Registro de Pacientes', url: '/ocupacional/pacientes/lista' },
                    { titulo: 'Nuevo Paciente', url: '/ocupacional/pacientes/nuevo' },
                    { titulo: 'Registro Masivo', url: '/ocupacional/pacientes/nuevo' },
               ]
     },
     {
      titulo: 'PROTOCOLOS',
      submenu: [
                    { titulo: 'Registro de Protoclos', url: '/ocupacional/pacientes/lista' },
                    { titulo: 'Nueva Empresa', url: '/ocupacional/pacientes/nuevo' },
               ]
     },
     {
      titulo: 'EXÁMENES MÉDICOS',
      submenu: [
                    { titulo: 'Registro de Protoclos', url: '/ocupacional/pacientes/lista' },
                    { titulo: 'Nueva Empresa', url: '/ocupacional/pacientes/nuevo' },
               ]
     },
    {
      titulo: 'RESULTADOS MÉDICOS',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Resumen de Ventas', url: '/usuarios' },
        { titulo: 'Consolidado de Carga', url: '/hospitales' },
      ]
    },
    {
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
      secciones: [
        { titulo: 'Análisis', url: '/ocupacional/mantenimientos/analisis-clinicos' },
        { titulo: 'Diagnósticos', url: '/ocupacional/mantenimientos/diagnosticos' },
        { titulo: 'Exámenes de Laboratorio', url: '/ocupacional/mantenimientos/examenes-laboratorio' },
        { titulo: 'Tipos de Evaluaciones', url: '/ocupacional/mantenimientos/tipos-evaluaciones' },
      ]
    },
  ];

}
