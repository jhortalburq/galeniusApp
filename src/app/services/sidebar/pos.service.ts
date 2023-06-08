import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  constructor() { }

    menu: any = [
    {
      titulo: 'DOCUMENTOS',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Venta y Caja',
          submenu: [
              { titulo: 'Venta Rapida', url: '/usuarios' },
              { titulo: 'Lista de Ventas', url: '/usuarios' },
              { titulo: 'Movimientos de Caja', url: '/usuarios' },
              { titulo: 'Cierre de Caja', url: '/usuarios', status: 'active'  },
          ]
        },
        {
          titulo: 'Devoluciones',
          submenu: [
              { titulo: 'Nota de Crédito', url: '/usuarios' },
              { titulo: 'Devolucion de Dinero', url: '/usuarios' },
          ]
       },
        {
          titulo: 'Movimientos',
          submenu: [
              { titulo: 'Recepcion de Despacho', url: '/usuarios' },
          ]
       },
         {
          titulo: 'Consignaciones',
          submenu: [
              { titulo: 'Registro de Consignaciones', url: '/usuarios' },
              { titulo: 'Liquidar Consignaciones', url: '/usuarios' },
          ]
       },
      ]
    },
    {
      titulo: 'PROMOCIONES',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Gift Card',
          submenu: [
              { titulo: 'Registro de GifCard', url: '/usuarios' },
              { titulo: 'Consulta de GifCard', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Descuentos Preferenciales',
          submenu: [
            { titulo: 'Registro Descuentos Preferenciales', url: '/hospitales' },
          ]
        }
      ]
    },
    {
      titulo: 'CONSULTAS',
      icono: 'fa-user',
      submenu: [
          { titulo: 'Análisis de Ventas', url: '/usuarios' },
          { titulo: 'Ventas por Vendedor', url: '/usuarios' },
          { titulo: 'Ranking de Productos', url: '/hospitales' },
          { titulo: 'Ranking de Clientes', url: '/hospitales' },
          { titulo: 'Documentos por Vendedor', url: '/hospitales' },
          { titulo: 'Productos Vendidos', url: '/hospitales' },
      ]
    },
     {
      titulo: 'REPORTES',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Entradas y Salidas',
          submenu: [
              { titulo: 'Partes de Entrada', url: '/usuarios' },
              { titulo: 'Partes de Salida', url: '/usuarios' },
              { titulo: 'Guias de Remision', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Stock',
          submenu: [
            { titulo: 'Analisis de Movimientos', url: '/hospitales' },
            { titulo: 'Stock a la Fecha', url: '/hospitales' },
            { titulo: 'Kardex por Producto', url: '/hospitales' },
            { titulo: 'Kardex por Almacen', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Procesos',
          submenu: [
            { titulo: 'Toma de Inventario', url: '/hospitales' },
            { titulo: 'Apertura de Saldos Inicales', url: '/hospitales' },
            { titulo: 'Inventario Inicial Anual', url: '/hospitales' },
            { titulo: 'Recalcular Kardex', url: '/hospitales' },
          ]
        }
      ]
    },
    {
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
      submenu: [
          { titulo: 'Clientes', url: '/usuarios' },
          { titulo: 'Proveedores', url: '/usuarios' },
          { titulo: 'Vendedores', url: '/usuarios' },
          { titulo: 'Registro de Productos', url: '/usuarios' },
          { titulo: 'Familias de Productos', url: '/usuarios' },
          { titulo: 'Registro de Almacen', url: '/usuarios' },
          { titulo: 'Registro de Movimientos Almacen', url: '/usuarios' },
          { titulo: 'Documentos Series', url: '/usuarios' },
          // { titulo: 'Tipo de Precio', url: '/usuarios' },
          { titulo: 'Lista de Precio', url: '/usuarios' },
          // { titulo: 'Formas de Pago Cobranza', url: '/usuarios' },
          // { titulo: 'Registro de Caja', url: '/usuarios' },
          // { titulo: 'Registro de Caja Registradora', url: '/usuarios' },
          // { titulo: 'Canales de Venta', url: '/usuarios' },
          { titulo: 'Marca', url: '/usuarios' },
          { titulo: 'Unidades de Medida', url: '/usuarios' },
          { titulo: 'Tipo de Cambio', url: '/usuarios' },
          // { titulo: 'Parametros', url: '/usuarios' },
      ]
    },
  ];

}
