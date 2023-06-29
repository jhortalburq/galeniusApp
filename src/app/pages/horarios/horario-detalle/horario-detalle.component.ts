import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import esLocale from '@fullcalendar/core/locales/es';

import { BreadcrumbsService, MantenimientoService, HorariosService, EmpresaService } from '../../../services/services.index';


@Component({
  selector: 'app-horario-detalle',
  templateUrl: './horario-detalle.component.html',
  styleUrls: ['./horario-detalle.component.scss']
})

export class HorarioDetalleComponent {
  @Input('changeDate') changeDate: string;
  @Input('especialidad_id') especialidad_id: number;
  @Input('especialista_id') especialista_id: number;

  @Output() changeDateCalendar = new EventEmitter<string>();

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; 
  private calendarApi

  selected = new Date();

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
          this.changeDateEmit(new Date(data.startStr));
      }),
  };

  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
              public empresaService: EmpresaService,
              private router: Router) {
  }

  ngOnInit() {
  }

  changeDateEmit(value: any) {
    console.log(value)
    this.changeDateCalendar.emit(value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.calendarComponent) {
      this.calendarApi = this.calendarComponent.getApi();
      this.calendarApi.gotoDate(this.changeDate);
    }
  }

  // ngAfterViewInit(){
  //   this.calendarApi = this.calendarComponent.getApi();
  //   let currentDate = this.calendarApi.view.activeStart;
  
  //   console.log(currentDate); // result: current calendar start date
  // }

  loadEvents(fecha: string) {
    this.horariosService.getHorariosEspecialista(this.especialista_id, this.especialidad_id, this.empresaService.organizacion_seleccionada.id, this.empresaService.sucursal_seleccionada.id, fecha)
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
}
