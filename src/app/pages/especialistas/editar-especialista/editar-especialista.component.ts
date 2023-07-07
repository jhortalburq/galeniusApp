import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        EspecialistasService,
        SharedService,
        AlertService
} from '../../../services/services.index';

@Component({
  selector: 'app-editar-especialista',
  templateUrl: './editar-especialista.component.html',
  styleUrls: ['./editar-especialista.component.scss']
})
export class EditarEspecialistaComponent {
  slug: string;
  especialista: any = {};

  registerForm: FormGroup;

  tipo_documento: FormControl;
  no_documento: FormControl;
  genero: FormControl;
  fecha_nacimiento: FormControl;
  apellido_paterno: FormControl;
  apellido_materno: FormControl;
  nombres: FormControl;
  colegiatura: FormControl;

  telefono: FormControl;
  email: FormControl;
  domicilio: FormControl;
  nacionalidad: FormControl;

  estado_civil: FormControl;
  departamento: FormControl;
  provincia: FormControl;
  ubigeo: FormControl;
  especialidad_id: FormArray;

  disabled: boolean = false;

  tipos_departamentos: any = [];
  tipos_provincias: any = [];
  tipos_distritos: any = [];

  tipos_documentos: any = [];
  tipos_generos: any = [];
  tipos_estado_civil: any = [];

  data: any = [];

  documento_default: number = 0;
  genero_default: number = 0;

  departamento_default: string = '';
  provincia_default: string = '';
  distrito_default: string = '';

  _especialidades: any = [];

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public especialistaService: EspecialistasService,
      public sharedService: SharedService,
      public alertService: AlertService,
      private router: Router,
      private route: ActivatedRoute,
  ) { 
    this.breadcrumbService.title = 'EDITAR ESPECIALISTA';
  }

  async ngOnInit() {
      this.slug = this.route.snapshot.paramMap.get('slug');
      this.getTiposDocumentos();
      this.getTiposGeneros();
      this.getTiposEstadosCivil();
      this.getTiposDepartamentos();
      this.createFormControls();
      this.createForm();
      this.getModulos();
      this.getRegistro();
    }


  getRegistro() {
    this.especialistaService.getEspecialista(this.slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
      .subscribe({
        next: (res: any) => {
          this.especialista = res;
          this.provincia_default = this.especialista.cod_prov
          this.distrito_default = this.especialista.ubigeo

          let fecha_nacimiento = new Date(this.especialista.fecha_nacimiento);

          fecha_nacimiento.setHours(24);

          this.loadProvincia(this.especialista.cod_depart);
          
          this.registerForm.patchValue({
              no_documento: this.especialista.no_documento,
              tipo_documento: this.especialista.tipo_documento,
              apellido_paterno: this.especialista.apellido_paterno,
              apellido_materno: this.especialista.apellido_materno,
              nombres: this.especialista.nombres,
              fecha_nacimiento: fecha_nacimiento,
              genero: this.especialista.genero,
              email: this.especialista.email,
              telefono: this.especialista.telefono,
              colegiatura: this.especialista.colegiatura,
              domicilio: this.especialista.domicilio,
              nacionalidad: this.especialista.nacionalidad,
              estado_civil: this.especialista.estado_civil,
              departamento: this.especialista.cod_depart,
          })

        },
        error: (err: any) => {
          console.log('error', err)
        }
      })
  }

  createFormControls() {
    this.tipo_documento = new FormControl(this.documento_default, Validators.required);
    this.no_documento = new FormControl('', Validators.required);
    this.apellido_paterno = new FormControl('', Validators.required);
    this.apellido_materno = new FormControl('', Validators.required);
    this.nombres = new FormControl('', Validators.required);
    this.fecha_nacimiento = new FormControl('', Validators.required);
    this.genero = new FormControl(this.genero_default);
    this.email = new FormControl('');
    this.telefono = new FormControl('');
    this.nacionalidad = new FormControl('PERUANA');
    this.domicilio = new FormControl('');
    this.estado_civil = new FormControl('');

    this.departamento = new FormControl('');
    this.provincia = new FormControl('');
    this.ubigeo = new FormControl('');
    this.colegiatura = new FormControl('', Validators.required);
    this.especialidad_id = new FormArray([]);

  }

  createForm() {
     this.registerForm = new FormGroup({
      tipo_documento: this.tipo_documento,
      no_documento: this.no_documento,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      nombres: this.nombres,
      fecha_nacimiento: this.fecha_nacimiento,
      genero: this.genero,
      email: this.email,
      telefono: this.telefono,
      domicilio: this.domicilio,
      nacionalidad: this.nacionalidad,
      estado_civil: this.estado_civil,
      departamento: this.departamento,
      provincia: this.provincia,
      ubigeo: this.ubigeo,
      colegiatura: this.colegiatura,
      especialidad_id: this.especialidad_id
    });
  }

  changeCheckbox(item: any) {
    if (item.boolean) {
      this.especialidad_id.push(new FormControl(item.id))
    } else {
      let i: number = 0;
      this.especialidad_id.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == item.id) {
          this.especialidad_id.removeAt(i);
          return;
        }
        i++;
      });  
    }
  }

  getModulos() {
    this.mantenimientoService.getEspecialidades(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                             .subscribe((response: any) => {
                                          this._especialidades = response.results;
    });
  }

  getTiposDocumentos() {
    this.mantenimientoService.getTiposDocumentos()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  if (response.results[i].default) {
                                    this.documento_default = response.results[i].id;
                                  }
                                  this.tipos_documentos.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  getTiposEstadosCivil() {
    this.mantenimientoService.getTiposEstadosCivil()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_estado_civil.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  getTiposGeneros() {
    this.mantenimientoService.getTiposGeneros()
                             .subscribe((response: any) => {
                              for (let i = 0; i < response.results.length; i++) {
                                  if (response.results[i].default) {
                                    this.genero_default = response.results[i].id;
                                  }
                                  this.tipos_generos.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  getTiposDepartamentos() {
    this.mantenimientoService.getTiposDepartamento()
                             .subscribe((response: any) => {
                                  this.tipos_departamentos = response.results
                              });
  }

  changeDepartment(e: any) {
    if (e.value) {
      this.departamento_default = e.value;
      this.provincia_default = '';
      this.especialista.cod_depart = 0;
      this.especialista.cod_prov = 0;
      this.getTiposProvincia(e.value);
    }
  }

  changeProvince(e: any) {
    if (e.value) {
      this.provincia_default = e.value;
      this.getTiposDistritos(this.departamento_default, e.value);
    }
  }

  loadProvincia(cod_dep: string) {
    if (cod_dep) {
      this.departamento_default = cod_dep;
      this.getTiposProvincia(cod_dep);
    } 
  }


  loadDistrito(cod_dep: string, cod_prov: string) {
    if (cod_dep && cod_prov) {
      this.departamento_default = cod_dep;
      this.provincia_default = cod_prov;
      this.getTiposDistritos(cod_dep, cod_prov);
    } 
  }

  getTiposProvincia(cod_depart: string) {

    this.mantenimientoService.getTiposProvincia(cod_depart)
                             .subscribe((response: any) => {
                                this.tipos_provincias = response.results
                                this.tipos_distritos = [];

                                this.registerForm.patchValue({
                                  ubigeo: '',
                                  provincia: this.provincia_default,
                                })

                                this.loadDistrito(this.especialista.cod_depart, this.especialista.cod_prov);
                              
                              });
  }

  getTiposDistritos(cod_depart: string, cod_provin: string) {

    this.mantenimientoService.getTiposDistritos(cod_depart, cod_provin)
                             .subscribe((response: any) => {
                                this.tipos_distritos = response.results
 
                                this.registerForm.patchValue({
                                  ubigeo: this.distrito_default,
                                })
                              });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;
      this.especialistaService.editEspecialista(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.slug)
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Especialista Editado', 2000);

                                        this.disabled = false;

                                        setTimeout(() => {
                                          this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'especialistas', res.slug, 'editar']);
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
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/especialistas/lista`;
    this.router.navigate([url]);
  }
}
