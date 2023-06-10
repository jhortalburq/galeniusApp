import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  constructor() { }

  menu: any = [
    {
      titulo: 'ORGANIZACIONES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'SUCURSALES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
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
      titulo: 'PACIENTES',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'ESPECIALISTAS',
      icono: 'fa-user',
      submenu: [
        { titulo: 'Usuarios', url: '/administrador/usuarios/' },
        { titulo : 'Permisos', url: '/progress' },
        { titulo : 'Grupos', url: '/progress' },
      ]
    },
    {
      titulo: 'EMPRESAS',
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
      secciones: [
        { titulo: 'Diagnósticos', url: '/administrador/empresas/' },
        { titulo: 'Especialidades', url: '/administrador/sucursales/' },
        { titulo: 'Indicaciones Médicas',  url: '/administrador/clientes/' },
        { titulo: 'Medicamentos', url: '/administrador/vendedores/' },
        { titulo: 'Tipos de Citas', url: '/administrador/proveedores/' },
        { titulo: 'Tipos de Evaluaciones', url: '/usuarios' },
        {
          titulo: 'Análisis Clínicos',
          submenu: [
              { titulo: 'Con Orden de Compra', url: '/usuarios' },
              { titulo: 'Parte de Entrada', url: '/usuarios' },
              { titulo: 'Recepción de Despachos', url: '/usuarios' },
          ]
        },
        {
          titulo: 'Estudios de Gabinete',
          submenu: [
              { titulo: 'Guía de Remisión', url: '/usuarios' },
              { titulo: 'Parte de Salida', url: '/usuarios' },
              { titulo: 'Parte Salida con Requerimiento', url: '/usuarios' },
          ]
       },
      ]
    },
  ];

}
