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
                { titulo: 'AGENDA DIARIA', url: '/asistencial/agenda/diaria' },
                { titulo: 'CITAS PROGRAMADAS', url: '/asistencial/citas/citas-programadas' },
               ]
   },
   {
    titulo: 'CONSULTAS MÉDICAS',
    submenu: [
                  { titulo: 'REGISTRO DE CONSULTAS', url: '/asistencial/agenda/diaria' },
             ]
   },
   {
    titulo: 'PACIENTES',
    submenu: [
                  { titulo: 'REGISTROS DE PACIENTES', url: '/asistencial/agenda/diaria' },
             ]
   },
   {
    titulo: 'ESPECIALISTAS',
    submenu: [  
              { titulo: 'REGISTROS DE ESPECIALISTA', url: '/asistencial/agenda/diaria' },
              { titulo: 'NUEVO ESPECIALISTA', url: '/asistencial/agenda/diaria' },
             ]
   },
   {
    titulo: 'REGISTRO DE HORARIOS',
    submenu: [
                  { titulo: 'HORARIOS POR ESPECIALISTA', url: '/asistencial/agenda/diaria' },
                  { titulo: 'TABLERO GENERAL', url: '/asistencial/agenda/diaria' },
                  { titulo: 'INGRESAR HORARIO', url: '/asistencial/agenda/diaria' },
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
