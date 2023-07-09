import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

  tab: number = 1;

  irTab(number) {
    this.tab = number;
  }
}
