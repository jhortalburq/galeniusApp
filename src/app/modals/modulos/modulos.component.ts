import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from '../../../../ng-uikit-pro-standard/src/public_api';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})

export class ModulosComponent implements OnInit {

  constructor(
        public modalRef: MDBModalRef,
        public router: Router,
  ) { }

  ngOnInit() {
  }

  irModulo(modulo: string) {
      this.router.navigate(['/' + modulo, 'menu']);
      this.modalRef.hide();
  }
}
