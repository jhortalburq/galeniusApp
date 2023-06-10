import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor() { }

  menu: any = [
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
      titulo: 'MANTENIMIENTOS',
      icono: 'fa-user',
      submenu: [
          { titulo: 'Empresas', url: '/administrador/empresas/' },
          { titulo: 'Sucursales', url: '/administrador/sucursales/' },
          { titulo: 'Clientes',  url: '/administrador/clientes/' },
          { titulo: 'Vendedores', url: '/administrador/vendedores/' },
          { titulo: 'Proveedores', url: '/administrador/proveedores/' },

          { titulo: 'Registro de Cajas', url: '/usuarios' },
          { titulo: 'Tipo de Precio', url: '/usuarios' },
          { titulo: ' de Precio', url: '/usuarios' },

          { titulo: 'Tipos Identidad', url: '/usuarios' },
          { titulo: 'Monedas', url: '/usuarios' },
          { titulo : 'Series Documentos', url: '/progress' },
      ]
    },
    {
        titulo: 'ALMACENES',
        submenu: [
            { titulo: 'Registro de Almacenes',  url: '/administrador/almacenes/' },
            { titulo: 'Movimientos de Almacén', url: '/administrador/movimientos-almacen/' },
            { titulo: 'Listas de Precios', url: '/usuarios' },
            { titulo: 'Cierre de Almacén por Fecha', url: '/usuarios' },
            { titulo: 'Cierre de Almacén por Periodo', url: '/usuarios' },
            { titulo: 'Stock de Seguridad', url: '/hospitales' },
        ]
      },
      {
        titulo: 'PRODUCTOS',
        submenu: [
            { titulo: 'Familia de Productos',  url: '/administrador/familias-productos/' },
            { titulo: 'Linea de Productos',  url: '/administrador/lineas-productos/' },
            { titulo: 'SubLinea de Productos', url: '/administrador/sublineas-productos/' },
            { titulo: 'Registro de Productos', url: '/administrador/productos/' },
            { titulo: 'Marcas', url: '/administrador/marcas/' },
            { titulo: 'Unidades de Medida', url: '/administrador/unidades-medidas/' },
            { titulo: 'Características', url: '/administrador/caracteristicas/' },
            { titulo: 'Tipos de Productos',  url: '/administrador/tipos-productos/' },
            { titulo: 'Homologacion Productos Kardex', url: '/usuarios' },
            { titulo: 'SKU Clientes', url: '/medicos' },
            { titulo: 'Lotes', url: '/medicos' }
        ]
      },
  ];

}
