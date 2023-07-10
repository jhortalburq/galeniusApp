import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-triaje',
  templateUrl: './triaje.component.html',
  styleUrls: ['./triaje.component.scss']
})
export class TriajeComponent {

  @Input() registro;

}
