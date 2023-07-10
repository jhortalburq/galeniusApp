import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, 
         SharedService,
         AlertService,
         ExamenesService
} from '../../../../../services/services.index';

import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-antecedentes-personales',
  templateUrl: './antecedentes-personales.component.html',
  styleUrls: ['./antecedentes-personales.component.scss']
})
export class AntecedentesPersonalesComponent {
  @Input() slug;

  registros = [];
  registros_detalle = [];
  
  disabled: boolean = false;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    public alertService: AlertService,
    public router: Router,
    public examenesService: ExamenesService,
  ) {}

  async ngOnInit() {
      this.getRegistro();
    }

  async getRegistro() {
      const info$ = this.examenesService.getAntecedentesPersonales(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug);
      let _antecedentes = await lastValueFrom(info$);
      this.registros = _antecedentes.results;

      this.registros_detalle = _antecedentes.results.filter((res: any) => res.detalle == 'True');
      this.registros = _antecedentes.results.filter((res: any) => res.detalle == 'False');
    
    }

  // changeCheckbox(item: any) {
  //   if (item.boolean) {
  //     this.modulos_id.push(new FormControl(item.id))
  //   } else {
  //     let i: number = 0;
  //     this.modulos_id.controls.forEach((ctrl: FormControl) => {
  //       if(ctrl.value == item.id) {
  //         this.modulos_id.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });  
  //   }
  // }
  
  onSubmit() {
      this.disabled = true;
      window.scroll(0,0);
      let _registros = this.registros.concat(this.registros_detalle)
      this.examenesService.updateAntecedentePersonalesFicha(_registros, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
                          .subscribe({
                              next: (res: any) => {
                                this.disabled = false;
                                this.alertService.successSwalToast('Antecedentes Actualizados', 2000);
                                this.getRegistro();
                              },
                              error: (err: any) => {
                                console.log('error')
                                this.disabled = false;
                              }
                          })
  }
}