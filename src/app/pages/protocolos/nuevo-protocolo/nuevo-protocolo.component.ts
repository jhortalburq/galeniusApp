import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        ProtocolosService,
        SharedService,
        AlertService,
        EmpresasService
} from '../../../services/services.index';


@Component({
  selector: 'app-nuevo-protocolo',
  templateUrl: './nuevo-protocolo.component.html',
  styleUrls: ['./nuevo-protocolo.component.scss']
})
export class NuevoProtocoloComponent {
  registerForm: FormGroup;

  nombre: FormControl;
  tipo_evaluacion: FormControl;
  fichas: FormArray;
  analisis: FormArray;
  test_psicologicos: FormArray;
  empresa: FormControl;
  flag_emo: FormControl;

  disabled: boolean = false;

  choices_tipos_evaluaciones: any = [];
  choices_empresas: any = [];
  choices_fichas: any = [];
  choices_grupo_analisis: any = [];
  choices_tests_psicologicos: any = [];

  data: any = [];

  enable_lab: boolean = false;
  enable_psico: boolean = false;

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public protocolosService: ProtocolosService,
      public sharedService: SharedService,
      public alertService: AlertService,
      public empresaService: EmpresasService,
      private router: Router
  ) { 
    this.breadcrumbService.title = 'NUEVO PROTOCOLO';
  }

  async ngOnInit() {
      this.getChoicesTipoEvaluacion();
      this.getChoicesEmpresas();
      this.getChoicesFichas();
      this.getChoicesGruposAnalisis();
      this.getChoicesTestPsicologicos();
      this.createFormControls();
      this.createForm();
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.tipo_evaluacion = new FormControl('', Validators.required);
    this.empresa = new FormControl('');
    this.fichas =  new FormArray([]);
    this.analisis =  new FormArray([]);
    this.test_psicologicos =  new FormArray([]);
    this.flag_emo = new FormControl(true);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre: this.nombre,
      tipo_evaluacion: this.tipo_evaluacion,
      empresa: this.empresa,
      fichas: this.fichas,
      analisis: this.analisis,
      flag_emo: this.flag_emo,
      test_psicologicos: this.test_psicologicos
    });
  }

  getChoicesTipoEvaluacion() {
    return this.mantenimientoService.getDataMantenimiento('tipos-evaluacion', this.sharedService.organizacion_seleccionada.id)
                              .subscribe((response: any) => {
                                this.choices_tipos_evaluaciones = [];

                                for (let i = 0; i < response.results.length; i++) {
                                  this.choices_tipos_evaluaciones.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  getChoicesEmpresas() {
    return this.empresaService.getEmpresas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                       .subscribe((response: any) => {
                                this.choices_empresas = [];

                                for (let i = 0; i < response.results.length; i++) {
                                  this.choices_empresas.push({value: response.results[i].id, label: response.results[i].razon_social})
                                }
                              });
  }

  getChoicesFichas() {
    return this.mantenimientoService.getFichasExamenes()
                       .subscribe((response: any) => {
                                this.choices_fichas = response.results.map( (item) => {
                                  return {...item, checked: false}
                                })
                              });
  }

  getChoicesGruposAnalisis() {
    this.mantenimientoService.getDataMantenimiento('examenes-laboratorio', this.sharedService.organizacion_seleccionada.id)
                            .subscribe((response: any) => {
                                this.choices_grupo_analisis = response.results.map( (item) => {
                                  return {...item, checked: false}
                                })
                              });
  }

  getChoicesTestPsicologicos() {
    this.mantenimientoService.getDataMantenimiento('tests-psicologicos', this.sharedService.organizacion_seleccionada.id)
                       .subscribe((response: any) => {
                                this.choices_tests_psicologicos = response.results.map( (item) => {
                                  return {...item, checked: false}
                                })
                              });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.protocolosService.addProtocolo(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Protocolo Registrado', 2000);

                                        setTimeout(() => {
                                            this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'protocolos', res.slug, 'editar']);
                                        }, 500)
                                      },
                                      error: (err: any) => {
                                        console.log('error')
                                      }
                                    })
    }
  }

  regresar() {
    let url = this.router.url;
    url = url.replace('nuevo', 'lista');
    this.router.navigate([url]);
  }


  changeCheckbox(item: any, tipo: number) {
    if (tipo == 1) {
      if (item.boolean) {
        if (item.clave == 'lab') {
          this.enable_lab = true;
        };

        if (item.clave == 'psico') {
          this.enable_psico = true;
        };

        this.fichas.push(new FormControl(item.id))
      } else {
        let i: number = 0;

        if (item.clave == 'lab') {
          this.enable_lab = false;
        };

        if (item.clave == 'psico') {
          this.enable_psico = false;
        };

        this.fichas.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == item.id) {
            this.fichas.removeAt(i);
            return;
          }
          i++;
        });  
      }
    } else if (tipo == 2) {
      if (item.boolean) {
        this.analisis.push(new FormControl(item.id))
      } else {
        let i: number = 0;
        this.analisis.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == item.id) {
            this.analisis.removeAt(i);
            return;
          }
          i++;
        });  
      }
    }  else if (tipo == 3) {
      if (item.boolean) {
        this.test_psicologicos.push(new FormControl(item.id))
      } else {
        let i: number = 0;
        this.test_psicologicos.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == item.id) {
            this.test_psicologicos.removeAt(i);
            return;
          }
          i++;
        });  
      }
    }

  }

}