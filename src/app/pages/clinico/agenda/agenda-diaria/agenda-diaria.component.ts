import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
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

import { NuevaCitaComponent } from '../../citas/nueva-cita/nueva-cita.component';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-agenda-diaria',
  templateUrl: './agenda-diaria.component.html',
  styleUrls: ['./agenda-diaria.component.scss'],
})
export class AgendaDiariaComponent implements OnInit {
  selected = new Date();
  toppings = new FormControl('');
  modalRef: MDBModalRef;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  toppingList: Array<any> = [
      {value: '1', name: 'First Group Option 1'},
      {value: '2', name: 'First Group Option 2'},
      {value: '3', name: 'Second Group Option 1'},
      {value: '4', name: 'Second Group Option 2'},
  ];

  constructor(public changeDetector: ChangeDetectorRef,
              private modalService: MDBModalService,
              private renderer: Renderer2,
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
        right: 'listDay,timeGridWeek,dayGridMonth'
      },
      events: [
        { title: 'event 1', start: '2023-06-08T14:30:00', end: '2023-06-08T15:00:00'},
        { title: 'event 2', start: '2023-06-08T16:30:00', end: '2023-06-08T17:00:00'},
      ]
  };

  openModal() {
    this.modalRef = this.modalService.show(NuevaCitaComponent, {
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
