import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-permisos-almacen',
  templateUrl: './permisos-almacen.component.html',
  styleUrls: ['./permisos-almacen.component.scss']
})
export class PermisosAlmacenComponent implements OnInit {
  @Input() registro;
  @Output() submitChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
