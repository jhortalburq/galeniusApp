import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistencialService {

  constructor() { }
  menu: any = [
    {
      titulo: 'AGENDA',
      submenu: [
                { titulo: 'Agenda Diaria', url: '/asistencial/agenda/diaria' },
                { titulo: 'Citas Programadas', url: '/asistencial/agenda/citas-programadas' },
               ]
   },
   {
    titulo: 'CONSULTAS MÉDICAS',
    submenu: [
                  { titulo: 'Registro de Consultas', url: '/asistencial/consultas/consultas-medicas' },
             ]
   },
   {
    titulo: 'ESPECIALISTAS',
    submenu: [  
              { titulo: 'Registro de Especialistas', url: '/asistencial/especialistas/lista' },
              { titulo: 'Nuevo Especialista', url: '/asistencial/especialistas/nuevo' },
             ]
   },
   {
    titulo: 'PACIENTES',
    submenu: [
                  { titulo: 'Registro de Pacientes', url: '/asistencial/pacientes/lista' },
                  { titulo: 'Nuevo Paciente', url: '/asistencial/pacientes/nuevo' },
             ]
   },
   {
    titulo: 'EMPRESAS',
    submenu: [
                  { titulo: 'Registro de Empresas', url: '/asistencial/empresas/lista' },
                  { titulo: 'Nueva Empresa', url: '/asistencial/empresas/nuevo' },
                  // { titulo: 'Registro Masivo', url: '/ocupacional/pacientes/nuevo' },
             ]
   },
   {
    titulo: 'REGISTRO DE HORARIOS',
    submenu: [
                  { titulo: 'Horarios por Especialistas', url: '/asistencial/horarios/horarios-especialistas' },
             ]
   },
   {
    titulo: 'MANTENIMIENTOS',
    secciones: [
      { titulo: 'Análisis', url: '/asistencial/mantenimientos/analisis-clinicos' },
      { titulo: 'Diagnósticos', url: '/asistencial/mantenimientos/diagnosticos' },
      { titulo: 'Especialidades', url: '/asistencial/mantenimientos/especialidades' },
      { titulo: 'Estudios de Gabinete', url: '/asistencial/mantenimientos/estudios-gabinete' },
      { titulo: 'Exámenes de Laboratorio', url: '/asistencial/mantenimientos/examenes-laboratorio' },
      { titulo: 'Indicaciones Médicas', url: '/asistencial/mantenimientos/indicaciones-medicas' },
      { titulo: 'Medicamentos', url: '/asistencial/mantenimientos/medicamentos' },
      { titulo: 'Tipos de Citas', url: '/asistencial/mantenimientos/tipos-citas' },
    ]
  },
  ];

}
