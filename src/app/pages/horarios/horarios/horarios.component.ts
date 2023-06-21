import { Component, OnInit,  Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, MantenimientoService, HorariosService, EmpresaService } from '../../../services/services.index';



@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent {
  add_horario: boolean = false;

  selected = new Date();
  changeDate: string = '';

  especialidad_id: number = 0;
  especialista_id: number = 0;

  especialidades: any = [];
  especialistas: any = [];
  fecha: string = '';

  events: any = [];

  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
              public empresaService: EmpresaService,
              private renderer: Renderer2,
              private router: Router) {
  }

  ngOnInit() {
    this.breadcrumbService.title = 'HORARIOS POR ESPECIALISTAS';
    this.getEspecialidades();
  }

  // ngAfterViewInit(){
  //   this.calendarApi = this.calendarComponent.getApi();
  //   let currentDate = this.calendarApi.view.activeStart;
  
  //   console.log(currentDate); // result: current calendar start date
  // }

  getEspecialidades() {
    this.mantenimientoService.getEspecialidades(this.empresaService.empresa_seleccionada.id, this.empresaService.sucursal_seleccionada.id)
                             .subscribe((response: any) => {
                                 this.especialidades = response.results;
                              });
  }

  getEspecialistas(especialidad: number) {
    this.mantenimientoService.getEspecialistas(this.empresaService.empresa_seleccionada.id, this.empresaService.sucursal_seleccionada.id, especialidad)
                             .subscribe((response: any) => {
                                 this.especialistas = response;
                              });
  }

  onSelectEspecialidad(item: any) {
    this.especialidad_id = item.value;
    this.getEspecialistas(item.value);
  }

  onSelectEspecialista(item: any) {
    this.especialista_id = item.value;
  }

  onSelectDate(item: any) {
    this.changeDate = item.toISOString();
  }

  addHorario() {
    this.add_horario = true;
  }

  closeHorario() {
    this.add_horario = false;
  }

  setNewDate(event: any) {
    console.log('ssss', event);
    this.selected = event;
  }
}
