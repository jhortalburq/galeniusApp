import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MdbStepperComponent} from '../../../../../../ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';
import { lastValueFrom } from 'rxjs';

import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        AdmisionService,
        SharedService,
        AlertService,
        ProtocolosService,
        PacientesService,
        EmpresasService,
        NotificationsService
} from '../../../../services/services.index';


@Component({
  selector: 'app-agregar-atencion',
  templateUrl: './agregar-atencion.component.html',
  styleUrls: ['./agregar-atencion.component.scss']
})
export class AgregarAtencionComponent {
  @ViewChild('stepper', { static: true }) stepper: MdbStepperComponent

  registerForm: FormGroup;

  maxResults = 10;

  tipo_orden: FormControl;
  fecha_examen: FormControl;
  paciente: FormControl;
  protocolo: FormControl;

  fichas: FormArray;
  analisis: FormArray;
  tipo_analisis: FormArray;
  test_psicologicos: FormArray;

  disabled: boolean = false;

  choices_tipos_pacientes: any = [];
  choices_protocolos: any = [];
  choices_fichas: any = [];
  choices_grupo_analisis: any = [];
  choices_tests_psicologicos: any = [];
  choices_analisis: any = [];

  data: any = [];

  enable_lab: boolean = false;
  enable_analisis: boolean = false;
  enable_psico: boolean = false;

  _data: any = [];

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public admisionService: AdmisionService,
      public sharedService: SharedService,
      public alertService: AlertService,
      public empresaService: EmpresasService,
      public notificationService: NotificationsService,
      public protocolosService: ProtocolosService,
      public pacientesService: PacientesService,
      private router: Router
  ) { 
    this.breadcrumbService.title = 'NUEVA ATENCIÓN';
  }

  async ngOnInit() {
      this.getChoicesProtocolos();
      this.getChoicesPacientes();
      this.getChoicesFichas();
      this.getChoicesGruposAnalisis();
      this.getChoicesTestPsicologicos();
      this.createFormControls();
      this.createForm();
  }

  createFormControls() {
    let fecha =  new Date();

    fecha.setHours(fecha.getHours() - 5);

    this.protocolo = new FormControl('', Validators.required);
    this.paciente = new FormControl('', Validators.required);
    this.fecha_examen = new FormControl(fecha, Validators.required);
    this.tipo_orden = new FormControl('oc');
    this.fichas =  new FormArray([]);
    this.analisis =  new FormArray([]);
    this.tipo_analisis =  new FormArray([]);
    this.test_psicologicos =  new FormArray([]);
  }

  createForm() {
     this.registerForm = new FormGroup({
      paciente: this.paciente,
      protocolo: this.protocolo,
      fecha_examen: this.fecha_examen,
      tipo_orden: this.tipo_orden,
      fichas: this.fichas,
      analisis: this.analisis,
      tipo_analisis: this.tipo_analisis,
      test_psicologicos: this.test_psicologicos
    });
  }

  getChoicesProtocolos(params?: string) {
    return this.protocolosService.getProtocolosForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params)
                              .subscribe((response: any) => {
                                this.choices_protocolos = response.results;
                              });
  }

  getChoicesPacientes(params?: string) {
      return this.pacientesService.getPacientesForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params)
            .subscribe((response: any) => {
               this.choices_tipos_pacientes = response.results;
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
      this.disabled = true;

      this.admisionService.addAtencion(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Atención Registrada', 2000);

                                        setTimeout(() => {
                                            this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'admision', 'atenciones-diarias']);
                                        }, 500)
                                      },
                                      error: (err: any) => {
                                        this.disabled = false;
                                        console.log('error')
                                      }
                          })
    }
  }

  regresar() {
    let url = this.router.url;
    url = url.replace('nueva-atencion', 'atenciones-diarias');
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

  _searchPaciente(item: any) {
    this.getChoicesPacientes(item.search)
  }

  _focusPaciente(item: any) {
    this.getChoicesPacientes()
  }

  _searchProtocolos(item: any) {
    this.getChoicesProtocolos(item.search)
  }

  _focusProtocolos(item: any) {
    this.getChoicesProtocolos()
  }

  selectProtocolo(item: any) {
    if (item.value) {
      this.getItemsProtocolo(item.value);
    }
  }

  async getItemsProtocolo(protocolo_id: any) {
    const detalle$ = this.protocolosService.getProtocolosItemsForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, protocolo_id);
    this._data = await lastValueFrom(detalle$);

    this.enable_analisis = false;
    this.enable_lab = false;
    this.enable_psico = false;
    
    this.analisis.clear();
    this.tipo_analisis.clear();
    this.test_psicologicos.clear();
    this.fichas.clear();

    this.choices_tests_psicologicos.map( (item: any) => {
        item.boolean = false;
        return item
    })

    this.choices_grupo_analisis.map( (item: any) => {
          item.boolean = false;
          return item
    });


    this.choices_analisis.map( (item: any) => {
          item.boolean = false;
          return item
    })

    this.choices_fichas.map( (item: any) => {
      if (item.clave == 'emo') {
        item.boolean = true;
      } else {
        item.boolean = false;
      }
      return item
    })
    
    this.setChoicesFichas(this._data.fichas);
    this.setChoicesTest(this._data.test_psicologicos);
    this.setChoicesLaboratorio(this._data.analisis);
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
                                this.setChoicesAnalisisLaboratorio(i, this._data.tipo_analisis);

                        })
    }

    this.stepper.next();
  }

  setChoicesFichas(fichas) {
      for (let item of fichas) {
          let index = this.choices_fichas.findIndex( (reg: any) => reg.id === item );
          this.choices_fichas[index].boolean = true;

          this.fichas.push(new FormControl(this.choices_fichas[index].id))

      }
  }

  setChoicesLaboratorio(analisis) {
    for (let item of analisis) {
        let index = this.choices_grupo_analisis.findIndex( (reg: any) => reg.id === item );

        if (index > 0) {
          this.choices_grupo_analisis[index].boolean = true;

          this.analisis.push(new FormControl(this.choices_grupo_analisis[index].id))

          if (this.analisis.length > 0) {
            this.enable_lab = true;
          }
        }
    }
  }

  setChoicesAnalisisLaboratorio(tipo, analisis) {
    let _index = this.choices_analisis.findIndex( (reg: any) => reg.examen_id === tipo );

    for (let item of analisis) {
        let index = this.choices_analisis[_index].results.findIndex( (reg: any) => reg.id === item );
        if (index > 0) {
          this.choices_analisis[_index].results[index].boolean = true;

          this.tipo_analisis.push(new FormControl(this.choices_analisis[_index].results[index].id))

        }
    }
  }

  setChoicesTest(tests) {
    for (let item of tests) {
        let index = this.choices_tests_psicologicos.findIndex( (reg: any) => reg.id === item );
        this.choices_tests_psicologicos[index].boolean = true;

        this.test_psicologicos.push(new FormControl(this.choices_tests_psicologicos[index].id))

        if (this.test_psicologicos.length > 0) {
          this.enable_psico = true;
        }
    }
  }

}