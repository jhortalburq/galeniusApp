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
  selector: 'app-antecedentes-laborales',
  templateUrl: './antecedentes-laborales.component.html',
  styleUrls: ['./antecedentes-laborales.component.scss']
})
export class AntecedentesLaboralesComponent {
  @Input() slug;

  registerForm: FormGroup;
  disabled: boolean = false;

  empresa_antigua: FormControl;
  fecha_inicio: FormControl;
  fecha_fin: FormControl;
  area_trabajo: FormControl;
  tiempo: FormControl;
  exposicion: FormControl;
  ocupacion: FormControl;
  actividad_empresa: FormControl;
  altitud: FormControl;
  epp: FormControl;

  registros = [];

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
      const info$ = this.examenesService.getAntecedentesLaborales(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug);
      let _registros = await lastValueFrom(info$);
      this.registros = _registros.results;
  }

  createFormControls() {
      this.empresa_antigua = new FormControl('', Validators.required);
      this.fecha_inicio = new FormControl('');
      this.fecha_fin = new FormControl('');
      this.area_trabajo = new FormControl('');
      this.tiempo = new FormControl('');
      this.ocupacion = new FormControl('');
      this.exposicion = new FormControl('');
      this.epp = new FormControl('');
      this.actividad_empresa = new FormControl('');
      this.altitud = new FormControl('');
  }

  createForm() {
    this.registerForm = new FormGroup({
      empresa_antigua: this.empresa_antigua,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      area_trabajo: this.area_trabajo,
      tiempo: this.tiempo,
      ocupacion: this.ocupacion,
      exposicion: this.exposicion,
      epp: this.epp,
      actividad_empresa: this.actividad_empresa,
      altitud: this.altitud,
    });
  }

  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
    this.router.navigate([url]);
  }

  onSubmit() {
    if (this.registerForm.valid) {
        this.disabled = true;
    
        this.examenesService.updateAtencedenteLaboralFicha(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.registerForm.reset();
                                  this.alertService.successSwalToast('Antecedente Registrado', 1000);
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

    this.examenesService.deleteAtencedenteLaboralFicha(item_id, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
                        .subscribe({
                            next: (res: any) => {
                              this.disabled = false;
                              this.alertService.successSwalToast('Antecedente Eliminado', 1000);
                              this.getRegistro();
                            },
                            error: (err: any) => {
                              console.log('error')
                              this.disabled = false;
                            }
                        })
  }
}
