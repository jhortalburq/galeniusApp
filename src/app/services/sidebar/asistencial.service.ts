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
                { titulo: 'Citas Programadas', url: '/asistencial/citas/citas-programadas' },
               ]
   },
   {
    titulo: 'CONSULTAS MÉDICAS',
    submenu: [
                  { titulo: 'Registro de Consultas', url: '/asistencial/agenda/diaria' },
             ]
   },
   {
    titulo: 'PACIENTES',
    submenu: [
                  { titulo: 'Registro de Pacientes', url: '/asistencial/agenda/diaria' },
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
    titulo: 'REGISTRO DE HORARIOS',
    submenu: [
                  { titulo: 'Tablero General', url: '/asistencial/horarios/tablero-general' },
                  { titulo: 'Horarios por Especialistas', url: '/asistencial/horarios/detalle' },
             ]
   },
    {
      titulo: 'MANTENIMIENTOS',
      class: '',
      submenu: [
          { titulo: 'Clientes', url: '/usuarios' },
          { titulo: 'Vendedores', url: '/usuarios' },
          // { titulo: 'Afiliados Tipo', url: '/usuarios' },
          { titulo: 'Registro de Productos', url: '/usuarios' },
          { titulo: 'Familias de Productos', url: '/usuarios' },
          { titulo: 'Documentos Series', url: '/usuarios' },
          // { titulo: 'Condiciones Pago', url: '/usuarios' },
          // { titulo: 'Formas de Pago Cobranza', url: '/usuarios' },
          // { titulo: 'Registro de Cajas', url: '/usuarios' },
          // { titulo: 'Registro de Cajas Registradoras', url: '/usuarios' },
          // { titulo: 'Canales de Venta', url: '/usuarios' },
          // { titulo: 'Tipo de Precio', url: '/usuarios' },
          { titulo: 'Lista de Precio', url: '/usuarios' },
          { titulo: 'Tipo de Cambio', url: '/usuarios' },
          // { titulo: 'Parametros', url: '/usuarios' },
      ]
    },
  ];

}
