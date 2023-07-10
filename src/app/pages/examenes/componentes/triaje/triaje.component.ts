import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-triaje',
  templateUrl: './triaje.component.html',
  styleUrls: ['./triaje.component.scss']
})
export class TriajeComponent {

  @Input() talla;
  @Input() peso;
  @Input() imc;
  @Input() perimetro_abdominal;
  @Input() perimetro_cadera;
  @Input() icc;
  @Input() fr;
  @Input() fc;
  @Input() pa;
  @Input() temperatura;
  @Input() sat;
  @Input() triaje_otros;

}
