import { Component, OnInit, signal, ChangeDetectorRef, Renderer2, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import esLocale from '@fullcalendar/core/locales/es';

import { BreadcrumbsService, MantenimientoService, HorariosService, EmpresaService } from '../../../services/services.index';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { IngresarHorarioComponent } from '../ingresar-horario/ingresar-horario.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-horario-detalle',
  templateUrl: './horario-detalle.component.html',
  styleUrls: ['./horario-detalle.component.scss']
})

export class HorarioDetalleComponent {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; 
  private calendarApi

  selected = new Date();
  toppings = new FormControl('');
  modalRef: MDBModalRef;

  especialidad_id: number = 0;
  especialista_id: number = 0;

  especialidades: any = [];
  especialistas: any = [];
  fecha: string = '';

  events: any = [];

  calendarOptions: CalendarOptions = {
      initialView: 'listDay',
      plugins: [listPlugin, interactionPlugin, timeGridPlugin, dayGridPlugin],
      height: 480,
      locale: esLocale,
      allDaySlot: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay'
      },
      datesSet: (data => {
          this.fecha = data.startStr.split('T')[0];
          this.loadEvents(this.fecha);
          this.selected = new Date(data.startStr);
      }),
  };

  constructor(public changeDetector: ChangeDetectorRef,
              private modalService: MDBModalService,
              public breadcrumbService: BreadcrumbsService,
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
    this.loadEvents(this.fecha);
  }

  onSelectDate(item: any) {
    let setDate = item.toISOString();
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.gotoDate(setDate);
  }

  loadEvents(fecha: string) {
    this.horariosService.getHorariosEspecialista(this.especialista_id, this.especialidad_id, this.empresaService.empresa_seleccionada.id, this.empresaService.sucursal_seleccionada.id, fecha)
                        .subscribe({
                          next: (res: any) => {
                            this.events = res.results;
                            this.calendarOptions.events = this.events;
                          },
                          error: (err: any) => {
                            console.log(err)
                          }
                        })
  }

  openModal() {
    this.modalRef = this.modalService.show(IngresarHorarioComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: false,
                  class: 'modal-lg modal-dialog modal-notify modal-primary',
                  animated: true,
              });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      if (result) {
        // this.getData();
        // this.filter = '';
      }
    });
  }
}
