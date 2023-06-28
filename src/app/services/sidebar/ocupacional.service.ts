import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcupacionalService {

  constructor() { }

  menu: any = [
    {
      titulo: 'DOCUMENTOS',
      icono: 'fa-user',
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
      titulo: 'EMPRESAS',
      submenu: [
                    { titulo: 'Registro de Empresas', url: '/ocupacional/pacientes/lista' },
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
      titulo: 'PROMOCIONES',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Promociones',
          submenu: [
            { titulo: 'Gestor de Promociones', url: '/usuarios' },
            { titulo: 'Descuentos Preferenciales', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Vales',
          submenu: [
            { titulo: 'Motivos de Vales', url: '/usuarios' },
            { titulo: 'Registro de Vales', url: '/hospitales' },
            { titulo: 'Generar Vales Automaticos', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Cupones',
          submenu: [
              { titulo: 'Registro de Requerimientos', url: '/usuarios' },
              { titulo: 'Recepción de Requerimientos', url: '/usuarios' },
              { titulo: 'Recepción por Partes Requeridos', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Tarjeta Puntos',
          submenu: [
              { titulo: 'Tipo de Tarjeta', url: '/usuarios' },
              { titulo: 'Registro de Tarjeta', url: '/usuarios' },
              { titulo: 'PArametros de Tarjeta', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Gift Card',
          submenu: [
              { titulo: 'Registro de GifCard', url: '/usuarios' },
              { titulo: 'Consulta de GifCard', url: '/usuarios' },
          ]
        }
      ]
    },
    {
      titulo: 'CONSULTAS',
      icono: 'fa-user',
      secciones: [
        {
          titulo: 'Ventas',
          submenu: [
              { titulo: 'Análisis de Ventas', url: '/usuarios' },
              { titulo: 'Análisis de Ventas vs Costos', url: '/usuarios' },
              { titulo: 'Análisis de Pedidos', url: '/hospitales' },
              { titulo: 'Análisis de Distribucion', url: '/hospitales' },
              { titulo: 'Ventas por Vendedor', url: '/hospitales' },
              { titulo: 'Ranking de Productos', url: '/hospitales' },
              { titulo: 'Ranking de Clientes', url: '/hospitales' },
              { titulo: 'Costo de Ventas', url: '/hospitales' },
              { titulo: 'Análisis de Ventas vs Cobranza', url: '/hospitales' },
              { titulo: 'Ventas por Afiliado', url: '/hospitales' },
          ]
        },
        {
          titulo: 'Stock',
          submenu: [
              { titulo: 'Stock a la Fecha', url: '/usuarios' },
          ]
       },
        {
          titulo: 'Tarjeta de Puntos',
          submenu: [
              { titulo: 'Puntos Vencidos', url: '/usuarios' },
              { titulo: 'Análisis de Puntos', url: '/usuarios' },
              { titulo: 'Evaluacion de Clientes', url: '/usuarios' },
          ]
       }
      ]
    },
    {
      titulo: 'REPORTES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Resumen de Ventas', url: '/usuarios' },
        { titulo: 'Consolidado de Carga', url: '/hospitales' },
      ]
    },
    {
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
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
