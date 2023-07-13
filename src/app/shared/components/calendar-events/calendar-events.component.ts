import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import esLocale from '@fullcalendar/core/locales/es';

import { 
  BreadcrumbsService, 
  MantenimientoService, 
  HorariosService, 
  SharedService,
  CitasService,
} from '../../../services/services.index';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss']
})
export class CalendarEventsComponent {
  @Input('changeDate') changeDate: string;
  @Input('especialidad_id') especialidad_id: number;
  @Input('especialista_id') especialista_id: number;
  @Input('tipoAgenda') tipoAgenda: number;

  @Output() changeDateCalendar = new EventEmitter<string>();

  @ViewChild('calendar') calendarComponent: FullCalendarComponent; 
  private calendarApi

  especialidades: any = [];
  especialistas: any = [];

  fecha: string = '';
  fecha_fin: string = '';

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
        right: 'listDay,listWeek,timeGridWeek'
      },
      buttonText: {
        listDay: 'Por Día',
        listWeek: 'Semanal',
        timeGridWeek: 'Tablero',
      },
      datesSet: (data => {
          this.fecha = data.startStr.split('T')[0];
          this.fecha_fin = data.endStr.split('T')[0];
          this.loadEvents(this.fecha, this.fecha_fin);
          this.changeDateEmit(new Date(data.startStr));
      }),
  };

  constructor(public breadcrumbService: BreadcrumbsService,
              public mantenimientoService: MantenimientoService,
              public horariosService: HorariosService,
              public sharedService: SharedService,
              public citasService: CitasService,
              private router: Router) {
  }

  ngOnInit() {
  }

  changeDateEmit(value: any) {
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

  loadEvents(fecha: string, fecha_fin: string) {
    if (this.tipoAgenda == 1) {
      this.horariosService.getHorariosEspecialista(this.especialista_id, this.especialidad_id, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, fecha, fecha_fin)
      .subscribe({
        next: (res: any) => {
          this.events = res.results;
          this.calendarOptions.events = this.events;
          console.log(this.events)
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    } else {
      this.citasService.getCitasEspecialista(this.especialista_id, this.especialidad_id, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, fecha, fecha_fin)
      .subscribe({
        next: (res: any) => {
          this.events = res.results;
          console.log(this.events)
          this.calendarOptions.events = this.events;
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
}
