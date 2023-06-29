import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalle-sucursal',
  templateUrl: './detalle-sucursal.component.html',
  styleUrls: ['./detalle-sucursal.component.scss']
})
export class DetalleSucursalComponent implements OnInit {

  content: any;
  action: Subject<any> = new Subject();

  constructor(
        public modalRef: MDBModalRef,
  ) { }

  ngOnInit(): void {
  }

  onEditSucursal(submit: boolean) {
    if (submit) {
        this.action.next( true );
        this.modalRef.hide();
    }
  }
}
