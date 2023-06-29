import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';


import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.scss']
})

export class DetalleEmpresaComponent implements OnInit {

  content: any;
  action: Subject<any> = new Subject();

  constructor(
        public modalRef: MDBModalRef,
  ) { }

  ngOnInit(): void {
  }

  onEditEmpresa(submit: boolean) {
    if (submit) {
        this.action.next( true );
        this.modalRef.hide();
    }
  }
}
