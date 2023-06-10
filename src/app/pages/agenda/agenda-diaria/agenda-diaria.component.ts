import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/core';

import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import esLocale from '@fullcalendar/core/locales/es';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-agenda-diaria',
  templateUrl: './agenda-diaria.component.html',
  styleUrls: ['./agenda-diaria.component.scss'],
})
export class AgendaDiariaComponent implements OnInit {
  selected = new Date();
  toppings = new FormControl('');

  toppingList: Array<any> = [
      {value: '1', name: 'First Group Option 1'},
      {value: '2', name: 'First Group Option 2'},
      {value: '3', name: 'Second Group Option 1'},
      {value: '4', name: 'Second Group Option 2'},
  ];

  constructor(public changeDetector: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
  }

  calendarOptions: CalendarOptions = {
      // customButtons: {
      //   myCustomButton1: {
      //     text: 'DIA',
      //     click: () => this.router.navigate(['/asistencial/agenda/diaria'])
      //   },
      //   myCustomButton2: {
      //     text: 'SEMANA',
      //     click: () => this.router.navigate(['/asistencial/agenda/semanal'])
      //   }
      // },
      initialView: 'listDay',
      plugins: [listPlugin, interactionPlugin, timeGridPlugin],
      height: 480,
      locale: esLocale,
      allDaySlot: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay,timeGridWeek'
      },
      events: [
        { title: 'event 1', start: '2023-06-08T14:30:00', end: '2023-06-08T15:00:00'},
        { title: 'event 2', start: '2023-06-08T16:30:00', end: '2023-06-08T17:00:00'},
      ]
  };

}
