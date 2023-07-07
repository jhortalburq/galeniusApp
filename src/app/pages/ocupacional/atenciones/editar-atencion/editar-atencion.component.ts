import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-editar-atencion',
  templateUrl: './editar-atencion.component.html',
  styleUrls: ['./editar-atencion.component.scss']
})
export class EditarAtencionComponent {
  slug: string;

  @ViewChild('stepper', { static: true }) stepper: MdbStepperComponent

  atencion: any = {};

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
  _data: any = [];

  enable_lab: boolean = false;
  enable_analisis: boolean = false;
  enable_psico: boolean = false;

  
  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public admisionService: AdmisionService,
      public sharedService: SharedService,
      public alertService: AlertService,
      public empresaService: EmpresasService,
      public protocolosService: ProtocolosService,
      public pacientesService: PacientesService,      
      public notificationService: NotificationsService,
      private router: Router,
      private route: ActivatedRoute,
  ) { 
    this.breadcrumbService.title = 'EDITAR ORDEN DE ATENCIÓN';
  }

  async ngOnInit() {
      this.slug = this.route.snapshot.paramMap.get('slug');

      this.createFormControls();
      this.createForm();

      this.getChoicesProtocolos();
      this.getChoicesPacientes();

      this.getChoicesFichas();
      this.getChoicesGruposAnalisis();
      this.getChoicesTestPsicologicos();
      this.getRegistro();
  }

  getRegistro() {
    this.admisionService.getAtencion(this.slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
    .subscribe({
      next: (res: any) => {
        this.atencion = res;
        this.registerForm.patchValue({
            paciente: this.atencion.paciente,
            fecha_examen: this.atencion.fecha_examen,
            protocolo: this.atencion.protocolo,
        });

        this.setChoicesFichas(this.atencion.fichas);
        this.setChoicesTest(this.atencion.test_psicologicos);
        this.setChoicesLaboratorio(this.atencion.analisis);
      },
      error: (err: any) => {
        console.log('error', err)
      }
    })
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

  createFormControls() {
    this.protocolo = new FormControl('', Validators.required);
    this.paciente = new FormControl('', Validators.required);
    this.fecha_examen = new FormControl('', Validators.required);
    this.fichas =  new FormArray([]);
    this.analisis =  new FormArray([]);
    this.tipo_analisis =  new FormArray([]);
    this.test_psicologicos =  new FormArray([]);
    this.tipo_orden = new FormControl('oc');
  }

  createForm() {
     this.registerForm = new FormGroup({
        protocolo: this.protocolo,
        paciente: this.paciente,
        fecha_examen: this.fecha_examen,
        fichas: this.fichas,
        analisis: this.analisis,
        tipo_orden: this.tipo_orden,
        tipo_analisis: this.tipo_analisis,
        test_psicologicos: this.test_psicologicos
    });
  }

  async getChoicesProtocolos(params?: string) {
    const protocolos$ = this.protocolosService.getProtocolosForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params);
    let _protocolos = await lastValueFrom(protocolos$);
    this.choices_protocolos = _protocolos.results;
  }

  async getChoicesPacientes(params?: string) {
    const pacientes$ = this.pacientesService.getPacientesForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params);
    let _pacientes = await lastValueFrom(pacientes$);
    this.choices_tipos_pacientes = _pacientes.results;
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
    return this.mantenimientoService.getDataMantenimiento('examenes-laboratorio', this.sharedService.organizacion_seleccionada.id)
                            .subscribe((response: any) => {
                                this.choices_grupo_analisis = response.results.map( (item) => {
                                  return {...item, boolean: false}
                                })
                                if (this.atencion.analisis) {
                                  this.setChoicesLaboratorio(this.atencion.analisis);
                                }
                              });
  }

  getChoicesTestPsicologicos() {
    this.mantenimientoService.getDataMantenimiento('tests-psicologicos', this.sharedService.organizacion_seleccionada.id)
                       .subscribe((response: any) => {
                                this.choices_tests_psicologicos = response.results.map( (item) => {
                                  return {...item, boolean: false}
                                })
                                if (this.atencion.test_psicologicos) {
                                  this.setChoicesTest(this.atencion.test_psicologicos);
                                }
                        });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;
      this.admisionService.editAtencion(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.slug, 'oc')
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Atención Editada', 2000);

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
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/admision/atenciones-diarias`;
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

  async nextLab() {

    for (let i of this.registerForm.value.analisis) {
        this.mantenimientoService.getAnalisisExamenLaboratorio(i, this.sharedService.organizacion_seleccionada.id)
                      .subscribe((res: any) => {
                                let found = this.choices_analisis.some( vendor => vendor['examen'] === res['examen'] );
                                if (!found) {
                                    this.choices_analisis.push(res);                                   
                                };
                                this.setChoicesAnalisisLaboratorio(i, this.atencion.tipo_analisis);

                        })
    }
    this.stepper.next();
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

}
