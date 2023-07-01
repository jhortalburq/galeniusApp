import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';

import { Subject } from 'rxjs';

import { SharedService, NotificationsService, MantenimientoService } from '../../../services/services.index';

@Component({
  selector: 'app-habiltar',
  templateUrl: './habiltar.component.html',
  styleUrls: ['./habiltar.component.scss']
})
export class HabiltarComponent {
  @Input() empresa;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  constructor(
        public modalRef: MDBModalRef,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    console.log(this.empresa)
  }


  onSubmit() {
      this.disabled = true;

    this.sharedService.habilitarOrganizacion(this.empresa.id)
                                  .subscribe({
                                    next: (response: any) => {
                                      this.action.next(true);
                                      this.notificationService.showInfo('Organización habilitada' , this.empresa.nombre);
                                      this.modalRef.hide();
                                    },
                                    error:  err => {
                                      this.disabled = false;
                                      this.notificationService.showError(JSON.stringify(err.error), '');

                                    }
                                  })
  }
}
