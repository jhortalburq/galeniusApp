import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { BreadcrumbsService, 
         SharedService,
         AlertService,
         ExamenesService
} from '../../../../../services/services.index';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-absentismos-laborales',
  templateUrl: './absentismos-laborales.component.html',
  styleUrls: ['./absentismos-laborales.component.scss']
})
export class AbsentismosLaboralesComponent {
  @Input() slug;

  registerForm: FormGroup;
  disabled: boolean = false;

  enfermedad: FormControl;
  en_trabajo: FormControl;
  anio: FormControl;
  dias_descanso: FormControl;

  registros = [];
  
  options = [
    {value: 'Si', label: 'Si'},
    {value: 'No', label: 'No'},
  ];

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    public alertService: AlertService,
    public router: Router,
    public examenesService: ExamenesService,
  ) {}

  async ngOnInit() {
      this.createFormControls();
      this.createForm();
      this.getRegistro();
    }

  async getRegistro() {
      const info$ = this.examenesService.getAntecedenteAbsentismos(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug);
      let _registros = await lastValueFrom(info$);
      this.registros = _registros.results;
  }

  createFormControls() {
      this.enfermedad = new FormControl('', Validators.required);
      this.en_trabajo = new FormControl('Si');
      this.anio = new FormControl('');
      this.dias_descanso = new FormControl('');
  }

  createForm() {
    this.registerForm = new FormGroup({
      enfermedad: this.enfermedad,
      en_trabajo: this.en_trabajo,
      anio: this.anio,
      dias_descanso: this.dias_descanso,
    });
  }

  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
    this.router.navigate([url]);
  }

  onSubmit() {
    if (this.registerForm.valid) {
        this.disabled = true;
        window.scroll(0,0);
    
        this.examenesService.updateAbsentismoLaboralFicha(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.alertService.successSwalToast('Antecedente Registrado', 2000);
                                  this.getRegistro();
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
    }
  }

  eliminarItem(item_id: number) {
    this.disabled = true;

    this.examenesService.deleteAbsentismoLaboralFicha(item_id, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
                        .subscribe({
                            next: (res: any) => {
                              this.disabled = false;
                              this.alertService.successSwalToast('Antecedente Eliminado', 2000);
                              this.getRegistro();
                            },
                            error: (err: any) => {
                              console.log('error')
                              this.disabled = false;
                            }
                        })
  }
}
