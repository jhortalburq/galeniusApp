import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-item',
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.scss']
})
export class CheckboxItemComponent {

  @Input() item: any;
  @Input() items: any;

  @Output() selectItem = new EventEmitter<any>();

  ngOnInit(): void {

  }

  ngOnChanges(){ 
    if (this.items){
      this.items.find(element => {
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
