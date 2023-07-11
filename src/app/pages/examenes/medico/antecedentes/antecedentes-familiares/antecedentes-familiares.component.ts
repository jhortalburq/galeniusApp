import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, 
         SharedService,
         AlertService,
         ExamenesService
} from '../../../../../services/services.index';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-antecedentes-familiares',
  templateUrl: './antecedentes-familiares.component.html',
  styleUrls: ['./antecedentes-familiares.component.scss']
})
export class AntecedentesFamiliaresComponent {
    @Input() slug;

    registros = [];
    
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
        const info$ = this.examenesService.getAntecedentesFamiliares(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug);
        let _antecedentes = await lastValueFrom(info$);
        this.registros = _antecedentes.results;
    }

    regresar() {
      let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
      this.router.navigate([url]);
    }

    onSubmit() {
        this.disabled = true;
    
        this.examenesService.updateAntecedenteFamiliarFicha(this.registros, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.alertService.successSwalToast('Antecedente Actualizado', 1000);
                                  this.getRegistro();
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
    }
  }
