import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        SharedService,
        EmpresasService,
        AlertService,
        AdmisionService
} from '../../../../services/services.index';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-laboral-ficha',
  templateUrl: './laboral-ficha.component.html',
  styleUrls: ['./laboral-ficha.component.scss']
})
export class LaboralFichaComponent {
  @Output() submitChange = new EventEmitter();
  @Input() orden_slug;

  registerLaboralForm: FormGroup;
  disabled: boolean = false;

  imageUrl: string | ArrayBuffer = "assets/img/image.png";

  empresa: FormControl;
  ruc: FormControl;
  rubro: FormControl;

  departamento: FormControl;
  provincia: FormControl;
  distrito: FormControl;
  direccion: FormControl;

  area_trabajo: FormControl;
  fecha_inicio: FormControl;
  tiempo_laborando: FormControl;
  ocupacion: FormControl;
  puesto_postula: FormControl;
  principales_riesgos: FormControl;
  medidas_seguridad: FormControl;
  info: FormControl;

  choices_empresas: any = [];

  maxResults = 10;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public empresaService: EmpresasService,
    public sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService,
    public admisionService: AdmisionService,
  ) {}

  async ngOnInit() {
      this.createFormControls();
      this.createForm();

      const choices$ = this.empresaService.getEmpresasForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id);
      let choices = await lastValueFrom(choices$);

      this.choices_empresas = choices.results;
      this.getRegistro();
    }

  async getRegistro() {
      const info$ = this.admisionService.getInfoLaboral(this.orden_slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc');
      let info_laboral = await lastValueFrom(info$);
      this.registerLaboralForm.patchValue({
          empresa: info_laboral.empresa,
          ruc: info_laboral.ruc,
          rubro: info_laboral.rubro,
          departamento: info_laboral.departamento,
          provincia: info_laboral.provincia,
          distrito: info_laboral.distrito,
          direccion: info_laboral.direccion,
          area_trabajo: info_laboral.area_trabajo,
          fecha_inicio: info_laboral.fecha_inicio,
          tiempo_laborando: info_laboral.tiempo_laborando,
          ocupacion: info_laboral.ocupacion,
          puesto_postula: info_laboral.puesto_postula,
          principales_riesgos: info_laboral.principales_riesgos,
          medidas_seguridad: info_laboral.medidas_seguridad,
          info: info_laboral.id
      })
  }

  createFormControls() {
      this.empresa = new FormControl('');
      
      this.ruc = new FormControl({ value: '', disabled: true });
      this.rubro = new FormControl({ value: '', disabled: true });
      this.provincia = new FormControl({ value: '', disabled: true });
      this.departamento = new FormControl({ value: '', disabled: true });
      this.distrito = new FormControl({ value: '', disabled: true });
      this.direccion = new FormControl({ value: '', disabled: true });

      this.area_trabajo = new FormControl('');
      this.fecha_inicio = new FormControl('');
      this.tiempo_laborando = new FormControl('');
      this.ocupacion = new FormControl('');
      this.puesto_postula = new FormControl('');
      this.principales_riesgos = new FormControl('');
      this.medidas_seguridad = new FormControl('');
      this.info = new FormControl('');
  }

  createForm() {
    this.registerLaboralForm = new FormGroup({
      empresa: this.empresa,
      ruc: this.ruc,
      rubro: this.rubro,
      departamento: this.departamento,
      provincia: this.provincia,
      distrito: this.distrito,
      direccion: this.direccion,
      area_trabajo: this.area_trabajo,
      fecha_inicio: this.fecha_inicio,
      tiempo_laborando: this.tiempo_laborando,
      ocupacion: this.ocupacion,
      puesto_postula: this.puesto_postula,
      principales_riesgos: this.principales_riesgos,
      medidas_seguridad: this.medidas_seguridad,
      info: this.info,
    });
  }

  getChoicesEmpresas(params?: string) {
    return this.empresaService.getEmpresasForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params)
          .subscribe((response: any) => {
             this.choices_empresas = response.results;
           });
  }

  _searchEmpresa(item: any) {
    this.getChoicesEmpresas(item.search);
  }

  async _selectEmpresa(item: any) {
    if (item.value) {
      this.empresaService.getEmpresa(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, item.value)
        .subscribe({
          next: (res: any) => {
            this.registerLaboralForm.patchValue({
              ruc: res.ruc,
              rubro: res.rubro,
              departamento: res.departamento,
              provincia: res.provincia,
              distrito: res.distrito,
              direccion: res.direccion
            })
          },
          error: (err: any) => console.log(err)
        })
    }
  }

  _focus(item: any) {
    this.getChoicesEmpresas();
  }

  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
    this.router.navigate([url]);
  }

  onSubmit() {
    if (this.registerLaboralForm.valid) {
        // this.submitChange.emit(this.registerLaboralForm.value);
        this.disabled = true;
        window.scroll(0,0);
    
        this.admisionService.updateinfoLaboralPaciente(this.registerLaboralForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.orden_slug)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.submitChange.emit(true);
                                  this.alertService.successSwalToast('Información Laboral Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
    }
  }
}
