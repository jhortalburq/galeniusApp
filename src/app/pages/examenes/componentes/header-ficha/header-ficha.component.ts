import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-ficha',
  templateUrl: './header-ficha.component.html',
  styleUrls: ['./header-ficha.component.scss']
})
export class HeaderFichaComponent {
  @Input() orden;

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.orden)
  }
}
