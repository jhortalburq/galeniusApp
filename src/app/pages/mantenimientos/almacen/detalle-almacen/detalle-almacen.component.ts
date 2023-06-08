import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalle-almacen',
  templateUrl: './detalle-almacen.component.html',
  styleUrls: ['./detalle-almacen.component.scss']
})
export class DetalleAlmacenComponent implements OnInit {

    content: any;
    action: Subject<any> = new Subject();
  
    constructor(
          public modalRef: MDBModalRef,
    ) { }
  
    ngOnInit(): void {
    }
  
    onEditRegistro(submit: boolean) {
      if (submit) {
          this.action.next( true );
          this.modalRef.hide();
      }
    }
  }
  