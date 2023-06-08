import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor() { }

    menu: any = [
    {
      titulo: 'MOVIMIENTOS',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Entradas',
          submenu: [
              { titulo: 'Con Orden de Compra', url: '/usuarios' },
              { titulo: 'Parte de Entrada', url: '/usuarios' },
              { titulo: 'Recepción de Despachos', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Salidas',
          submenu: [
              { titulo: 'Guía de Remisión', url: '/usuarios' },
              { titulo: 'Parte de Salida', url: '/usuarios' },
              { titulo: 'Parte Salida con Requerimiento', url: '/usuarios' },
          ]
       },
      ]
    },
    {
      titulo: 'SOLICITUDES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Registro de Solicitudes', url: '/usuarios' },
        { titulo: 'Aprobación de Solicitudes', url: '/hospitales' },
      ]
    },
    {
      titulo: 'ORDENES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Registro de Órdenes', url: '/usuarios' },
        { titulo: 'Aprobación de Órdenes', url: '/hospitales' },
      ]
    },
    {
      titulo: 'REQUERIMIENTOS',
      icono: 'fa-user',
      submenu: [
              { titulo: 'Registro de Requerimientos', url: '/usuarios' },
              { titulo: 'Recepción de Requerimientos', url: '/usuarios' },
              { titulo: 'Recepción por Partes Requeridos', url: '/usuarios' },
          ]
    },
    {
      titulo: 'SEPARACIONES',
      icono: 'fa-user',
      submenu: [
              { titulo: 'Registro de Separaciones', url: '/usuarios' },
              { titulo: 'Liquidación de Separaciones', url: '/usuarios' },
          ]
    },
    {
      titulo: 'REPORTES',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Análisis Dinámicos',
          submenu: [
              { titulo: 'Análisis de Movimientos', url: '/usuarios' },
              { titulo: 'Análisis de Stock', url: '/usuarios' },
              { titulo: 'Stock vs Ventas', url: '/usuarios' },
              { titulo: 'Análisis de Separaciones', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Stock',
          submenu: [
              { titulo: 'Stock a la Fecha', url: '/usuarios' },
              { titulo: 'Stock a la Fecha Lote', url: '/usuarios' },
              { titulo: 'Stock a la Fecha Valorizado', url: '/usuarios' },
          ]
       },
        {
          titulo: 'Kárdex',
          submenu: [
              { titulo: 'Kárdex a la Fecha', url: '/usuarios' },
              { titulo: 'Kárdex a la Fecha Lote', url: '/usuarios' },
              { titulo: 'Kárdex a la Fecha Valorizado', url: '/usuarios' },
              { titulo: 'Kárdex por Almacén', url: '/usuarios' },
          ]
       },
        {
          titulo: 'Procesos',
          submenu: [
              { titulo: 'Toma de Inventario', url: '/usuarios' },
              { titulo: 'Apertura de Saldos Iniciales', url: '/usuarios' },
              { titulo: 'Inventario Inicial Anual', url: '/usuarios' },
          ]
       },
      ]
    },

    {
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
      secciones: [
        { titulo: 'Sucursales', url: '/inventario/sucursales/' },
        { titulo: 'Proveedores', url: '/inventario/proveedores/' },
        { titulo: 'Trabajadores', url: '/usuarios' },
        { titulo: 'Areas de Trabajo', url: '/usuarios' },
        { titulo: 'Transportistas', url: '/usuarios' },
        { titulo: 'Maquinistas', url: '/usuarios' },
        { titulo: 'Firmas', url: '/usuarios' },
        { titulo: 'Tipo de Cambio', url: '/usuarios' },
        { titulo: 'Parámetros', url: '/usuarios' },
        {
          titulo: 'Almacenes',
          submenu: [
              { titulo: 'Registro de Almacenes', url: '/inventario/almacenes/' },
              { titulo: 'Movimientos de Almacén', url: '/inventario/movimientos-almacen/' },
              { titulo: 'Cierre de Almacén por Fecha', url: '/usuarios' },
              { titulo: 'Cierre de Almacén por Periodo', url: '/usuarios' },
              { titulo: 'Stock de Seguridad', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Productos',
          submenu: [
              { titulo: 'Registro de Productos', url: '/usuarios', status: 'active'  },
              { titulo: 'Familias de Productos', url: '/usuarios' },
              { titulo: 'Homologacion Productos Kardex', url: '/usuarios' },
              { titulo: 'Unidades de Medida', url: '/inventario/unidades-medidas/' },
              { titulo: 'Marcas', url: '/medicos' },
              { titulo: 'SKU Clientes', url: '/medicos' },
              { titulo: 'Lotes', url: '/medicos' }
          ]
       },
      ]
    },
  ];

}
