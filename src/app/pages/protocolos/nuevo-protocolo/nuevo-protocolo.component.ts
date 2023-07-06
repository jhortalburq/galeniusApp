import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MdbStepperComponent} from '../../../../../ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';

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
        EmpresasService,
        NotificationsService
} from '../../../services/services.index';


@Component({
  selector: 'app-nuevo-protocolo',
  templateUrl: './nuevo-protocolo.component.html',
  styleUrls: ['./nuevo-protocolo.component.scss']
})
export class NuevoProtocoloComponent {
  @ViewChild('stepper', { static: true }) stepper: MdbStepperComponent

  registerForm: FormGroup;

  maxResults = 10;

  nombre: FormControl;
  tipo_evaluacion: FormControl;
  fichas: FormArray;
  analisis: FormArray;
  tipo_analisis: FormArray;
  test_psicologicos: FormArray;
  empresa: FormControl;

  disabled: boolean = false;

  choices_tipos_evaluaciones: any = [];
  choices_empresas: any = [];
  choices_fichas: any = [];
  choices_grupo_analisis: any = [];
  choices_tests_psicologicos: any = [];

  choices_analisis: any = [];

  data: any = [];

  enable_lab: boolean = false;
  enable_analisis: boolean = false;
  enable_psico: boolean = false;

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public protocolosService: ProtocolosService,
      public sharedService: SharedService,
      public alertService: AlertService,
      public empresaService: EmpresasService,
      public notificationService: NotificationsService,
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
    this.tipo_analisis =  new FormArray([]);
    this.test_psicologicos =  new FormArray([]);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre: this.nombre,
      tipo_evaluacion: this.tipo_evaluacion,
      empresa: this.empresa,
      fichas: this.fichas,
      analisis: this.analisis,
      tipo_analisis: this.tipo_analisis,
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

  getChoicesEmpresas(params?: string) {
      return this.empresaService.getEmpresas(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params)
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
                                this.choices_fichas = response.results.map( (item: any) => {
                                  if (item.clave == 'emo') {
                                    return {...item, boolean: true}
                                  } else {
                                    return {...item, boolean: false}
                                  }
                                })
                              });
  }

  getChoicesGruposAnalisis() {
    this.mantenimientoService.getDataMantenimiento('examenes-laboratorio', this.sharedService.organizacion_seleccionada.id)
                            .subscribe((response: any) => {
                                this.choices_grupo_analisis = response.results.map( (item) => {
                                  return {...item, boolean: false}
                                })
                              });
  }

  getChoicesTestPsicologicos() {
    this.mantenimientoService.getDataMantenimiento('tests-psicologicos', this.sharedService.organizacion_seleccionada.id)
                       .subscribe((response: any) => {
                                this.choices_tests_psicologicos = response.results.map( (item) => {
                                  return {...item, boolean: false}
                                })
                              });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('guardar', this.registerForm.value)
      this.protocolosService.addProtocolo(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Protocolo Registrado', 2000);

                                        setTimeout(() => {
                                            this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'protocolos', 'lista']);
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
          this.enable_analisis = false;

          this.analisis.clear();

          this.choices_grupo_analisis.map( (item: any) => {
                item.boolean = false;
                return item
          });

          this.tipo_analisis.clear();

          this.choices_analisis.map( (item: any) => {
                item.boolean = false;
                return item
          })
        };

        if (item.clave == 'psico') {
          console.log('auiii')
          this.enable_psico = false;
          
          this.test_psicologicos.clear();

          this.choices_tests_psicologicos.map( (item: any) => {
              item.boolean = false;
              return item
          })
        };

        if (item.clave == 'emo') {
          item.boolean = true;
          this.notificationService.showError('No se puede quitar la ficha' , 'EMO');
        }

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

        let indexOfObject = this.choices_analisis.findIndex( vendor => vendor['examen_id'] === item.id);

        let objeto = this.choices_analisis.find( vendor => vendor['examen_id'] === item.id);
        
        if (objeto) {
          for (let _obj of objeto.results) {
            this.tipo_analisis.controls.forEach((ctrl: FormControl, index) => {
                if(ctrl.value == _obj.id) {
                  this.tipo_analisis.removeAt(index);
                }
            });
          }
        }

        this.choices_analisis.splice(indexOfObject, 1);

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
        this.tipo_analisis.push(new FormControl(item.id))
      } else {
        let i: number = 0;
        this.tipo_analisis.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == item.id) {
            this.tipo_analisis.removeAt(i);
            return;
          }
          i++;
        });  
      }
    } else if (tipo == 4) {
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

  _searchEmpresa(item: any) {
    this.getChoicesEmpresas(item.search)
  }

  _focus(item: any) {
    this.getChoicesEmpresas()
  }

  async nextLab() {
    // this.choices_analisis = [];

    for (let i of this.registerForm.value.analisis) {
        this.mantenimientoService.getAnalisisExamenLaboratorio(i, this.sharedService.organizacion_seleccionada.id)
                      .subscribe((res: any) => {
        
                                let found = this.choices_analisis.some( vendor => vendor['examen'] === res['examen'] );

                                if (!found) {
                                    this.choices_analisis.push(res);                                   
                                };

                                this.enable_analisis = this.choices_analisis.length > 0 ? true : false;

                        })
    }

    this.stepper.next();
  }

}