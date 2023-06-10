import { Component } from '@angular/core';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-citas-filtro',
  templateUrl: './citas-filtro.component.html',
  styleUrls: ['./citas-filtro.component.scss']
})
export class CitasFiltroComponent {
  data: Select2Data = [

          {
            "value": "hibiscus7",
            "label": "Hibiscus7",
          },
          {
            "value": "marigold6",
            "label": "Marigold6",
          },
          {
            "value": "hibiscus5",
            "label": "Hibiscus5",
          },
          {
            "value": "marigold4",
            "label": "Marigold4",
          },

          {
            "value": "hibiscus3",
            "label": "Hibiscus3",
          },
          {
            "value": "marigold2",
            "label": "Marigold2",
          }
    ]

    searchEspecialista(event: any) {
      console.log('22222', event.value)
    }
}
