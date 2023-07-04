import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-modulos',
  templateUrl: './checkbox-modulos.component.html',
  styleUrls: ['./checkbox-modulos.component.scss']
})
export class CheckboxModulosComponent {

  @Input() item: any;
  @Input() modulos: any;

  @Output() selectItem = new EventEmitter<any>();

  ngOnInit(): void {

  }

  ngOnChanges(){ 
    if (this.modulos){
      this.modulos.find(element => {
        if (element.id === this.item.id) {
          this.item.boolean = true;
          this.addSelectItem(this.item);
        }
      });
    }
  }

  addSelectItem(value: any) {
      this.selectItem.emit(value);
  }
  
}
