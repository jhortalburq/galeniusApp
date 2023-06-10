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
      ]
   },
    // { titulo: 'AGENDA DIARIA', url: '/asistencial/agenda/diaria', status: 'active', class: 'no-collase'},
    {
      titulo: 'DOCUMENTOS',
      class: '',
      secciones: [
        {
          titulo: 'Pedidos',
          submenu: [
              { titulo: 'Registro de Pedidos', url: '/usuarios', status: 'active'},
              { titulo: 'Aprobación de Pedidos', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Facturación',
          submenu: [
              { titulo: 'Lista de Ventas', url: '/usuarios' },
              { titulo: 'Registro Facturas', url: '/usuarios' },
              { titulo: 'Registro Boletas', url: '/usuarios' },
              { titulo: 'Registro Notas de Crédito', url: '/usuarios' },
              { titulo: 'Registro Notas de Débito', url: '/usuarios' },
              { titulo: 'Registro Notas de Venta', url: '/usuarios' },
              { titulo: 'Registro Percepciones', url: '/usuarios' },
              { titulo: 'Registro Letras por Cobrar', url: '/usuarios' },
          ]
       },
        {
          titulo: 'Cobranza y Transferencia',
          submenu: [
              { titulo: 'Cobranza', url: '/usuarios' },
              { titulo: 'Cobranza por Documento', url: '/usuarios' },
              { titulo: 'Transferencia Bancos', url: '/usuarios' },
          ]
       },
         {
          titulo: 'Consignaciones',
          submenu: [
              { titulo: 'Registro de Consignaciones', url: '/usuarios' },
              { titulo: 'Entregas Diferidas', url: '/usuarios' },
          ]
       },
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
