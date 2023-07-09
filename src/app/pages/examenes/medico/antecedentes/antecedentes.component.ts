import { Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent {
  @Input() slug;

  constructor(
    private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    console.log(this.slug)
  }
}
