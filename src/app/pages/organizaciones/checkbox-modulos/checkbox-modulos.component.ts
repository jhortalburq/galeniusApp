import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-modulos',
  templateUrl: './checkbox-modulos.component.html',
  styleUrls: ['./checkbox-modulos.component.scss']
})
export class CheckboxModulosComponent {

  @Input() item: any;
  @Output() selectItem = new EventEmitter<any>();

  addSelectItem(value: any) {
      this.selectItem.emit(value);
  }
  
}
