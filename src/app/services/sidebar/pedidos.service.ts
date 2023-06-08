import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PedidosService {

  constructor() { }

    menu: any = [
    {
      titulo: 'ABASTECIMIENTOS',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Solicitudes',
          submenu: [
            { titulo: 'Registro de Solicitudes', url: '/usuarios' },
            { titulo: 'Aprobación de Solicitudes', url: '/hospitales' },
            { titulo: 'Médicos', url: '/medicos' }
          ]
        },
        {
          titulo: 'Recepciones',
          submenu: [
              { titulo: 'Recepción de Solicitudes', url: '/usuarios' },
          ]
       },
       {
          titulo: 'Cotizaciones',
          submenu: [
              { titulo: 'Registro de Proformas', url: '/usuarios' },
          ]
       },
        {
          titulo: 'Órdenes',
          icono: 'fa-user',
          submenu: [
            { titulo: 'Compra Directa', url: '/usuarios' },
            { titulo: 'Registro de Órdenes', url: '/usuarios' },
            { titulo: 'Aprobación de Órdenes', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Importaciones',
          submenu: [
              { titulo: 'Registro de Importaciones', url: '/usuarios' },
          ]
       },
         {
          titulo: 'Acuerdos',
          submenu: [
              { titulo: 'Registro de Acuerdos', url: '/usuarios' },
              { titulo: 'Aprobación de Acuerdos', url: '/usuarios' },
          ]
       },
      ]
    },
    {
      titulo: 'CONSULTAS',
      icono: 'fa-user',
      submenu: [
          { titulo: 'Historial de Precios', url: '/usuarios' },
          { titulo: 'Tendencias de Precios', url: '/usuarios' },
          { titulo: 'Análisis de Compras', url: '/usuarios' },
          { titulo: 'Ranking de Proveedores', url: '/hospitales' },
          { titulo: 'Ranking de Productos', url: '/hospitales' },
          { titulo: 'Seguimiento de Solicitudes Compra', url: '/hospitales' },
          { titulo: 'Compras por Familia', url: '/hospitales' },
      ]
    },
    {
      titulo: 'REPORTES',
      icono: 'fa-user',
      submenu: [
          { titulo: 'Resumen de Compras', url: '/usuarios' },
      ]
    },
    {
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Misceláneos',
          submenu: [
              { titulo: 'Proveedores', url: '/usuarios' },
              { titulo: 'Trabajadores', url: '/usuarios' },
              // { titulo: 'Areas de Trabajo', url: '/usuarios' },
              // { titulo: 'Formas de Pago', url: '/usuarios' },
              // { titulo: 'Condiciones de Compra', url: '/usuarios' },
              // { titulo: 'Firmas', url: '/usuarios' },
              { titulo: 'Tipo de Cambio', url: '/usuarios' },
              // { titulo: 'PArametros', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Almacenes',
          submenu: [
              { titulo: 'Registro de Almacenes', url: '/usuarios', status: 'active'  },
              { titulo: 'Movimientos de Almacén', url: '/usuarios' },
              { titulo: 'Registro Lugares Entrega', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Productos',
          submenu: [
              { titulo: 'Registro de Productos', url: '/usuarios' },
              { titulo: 'Familias de Productos', url: '/usuarios' },
              { titulo: 'Homologacion Productos Kardex', url: '/usuarios' },
              { titulo: 'Unidades de Medida', url: '/hospitales' },
              { titulo: 'Marcas', url: '/medicos' },
              { titulo: 'Lotes', url: '/medicos' }
          ]
       },
        // {
        //   titulo: 'Importaciones',
        //   submenu: [
        //       { titulo: 'Criterios del Exterior', url: '/usuarios' },
        //       { titulo: 'Conceptos de Exterior', url: '/usuarios' },
        //       { titulo: 'Partidas Arancelarias', url: '/medicos' }
        //   ]
       // },
      ]
    },
  ];

}
