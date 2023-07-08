import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        PacientesService,
        SharedService,
        AlertService
} from '../../../services/services.index';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent {
  registerForm: FormGroup;

  imageUrl: string | ArrayBuffer = "assets/img/image.png";

  tipo_documento: FormControl;
  no_documento: FormControl;
  genero: FormControl;
  fecha_nacimiento: FormControl;
  apellido_paterno: FormControl;
  apellido_materno: FormControl;
  nombres: FormControl;

  telefono: FormControl;
  profesion: FormControl;
  email: FormControl;
  domicilio: FormControl;
  nacionalidad: FormControl;

  estado_civil: FormControl;
  grado_instruccion: FormControl;
  departamento: FormControl;
  provincia: FormControl;
  ubigeo: FormControl;

  residencia_lugar_trabajo: FormControl;
  tiempo_residencia_trabajo: FormControl;
  cobertura: FormControl;
  hijos_vivos: FormControl;
  no_dependientes: FormControl;

  disabled: boolean = false;

  tipos_departamentos: any = [];
  tipos_provincias: any = [];
  tipos_distritos: any = [];

  tipos_documentos: any = [];
  tipos_generos: any = [];
  tipos_estado_civil: any = [];
  tipos_grado_instruccion: any = [];

  choices_si_no: any = [
      {value: 1, label: 'Si'},
      {value: 2, label: 'No'},
  ];

  choices_cobertura: any = [
    {value: 1, label: 'ESSALUD'},
    {value: 2, label: 'EPS'},
    {value: 3, label: 'SCTR'},
    {value: 4, label: 'Otro'},
  ];
  
  data: any = [];

  documento_default: number = 0;
  genero_default: number = 0;

  departamento_default: string = '';
  provincia_default: string = '';
  distrito_default: string = '';

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public pacienteService: PacientesService,
      public sharedService: SharedService,
      public alertService: AlertService,
      private router: Router
  ) {}

  async ngOnInit() {
      this.getTiposDocumentos();
      this.getTiposGeneros();
      this.getTiposEstadosCivil();
      this.getTiposGradosInstruccion();
      this.getTiposDepartamentos();
      this.createFormControls();
      this.createForm();
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
    this.profesion = new FormControl('');
    this.nacionalidad = new FormControl('PERUANA');
    this.domicilio = new FormControl('');
    this.estado_civil = new FormControl('');
    this.grado_instruccion = new FormControl('');

    this.departamento = new FormControl('');
    this.provincia = new FormControl('');
    this.ubigeo = new FormControl('');

    this.residencia_lugar_trabajo = new FormControl('');
    this.tiempo_residencia_trabajo = new FormControl('');
    this.cobertura = new FormControl('');
    this.hijos_vivos = new FormControl('');
    this.no_dependientes = new FormControl('');

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
      profesion: this.profesion,
      domicilio: this.domicilio,
      nacionalidad: this.nacionalidad,
      estado_civil: this.estado_civil,
      grado_instruccion: this.grado_instruccion,
      departamento: this.departamento,
      provincia: this.provincia,
      ubigeo: this.ubigeo,
      residencia_lugar_trabajo: this.residencia_lugar_trabajo,
      tiempo_residencia_trabajo: this.tiempo_residencia_trabajo,
      cobertura: this.cobertura,
      hijos_vivos: this.hijos_vivos,
      no_dependientes: this.no_dependientes,
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

  getTiposGradosInstruccion() {
    this.mantenimientoService.getTiposGradosInstruccion()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_grado_instruccion.push({value: response.results[i].id, label: response.results[i].nombre})
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
      this.getTiposProvincia(e.value);
    }
  }

  changeProvince(e: any) {
    if (e.value) {
      this.provincia_default = e.value;
      this.getTiposDistritos(this.departamento_default, e.value);
    }
  }

  getTiposProvincia(cod_depart: string) {

    this.mantenimientoService.getTiposProvincia(cod_depart)
                             .subscribe((response: any) => {
                                this.tipos_provincias = response.results
                                this.tipos_distritos = [];

                                this.registerForm.patchValue({
                                  ubigeo: '',
                                  provincia: ''
                                })

                              });
  }

  getTiposDistritos(cod_depart: string, cod_provin: string) {

    this.mantenimientoService.getTiposDistritos(cod_depart, cod_provin)
                             .subscribe((response: any) => {
                                this.tipos_distritos = response.results
 
                                this.registerForm.patchValue({
                                  ubigeo: '',
                                })
                              });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // this.disabled = true;
      // window.scroll(0,0);

      // this.pacienteService.addPaciente(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
      //                     .subscribe({
      //                                 next: (res: any) => {
      //                                   this.alertService.successSwalToast('Paciente Registrado', 2000);

      //                                   setTimeout(() => {
      //                                     this.disabled = false;
      //                                     this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'pacientes', res.slug, 'editar']);
      //                                   }, 500)
      //                                 },
      //                                 error: (err: any) => {
      //                                   this.disabled = false;
      //                                   console.log('error')
      //                                 }
      //                               })
    }
  }

  regresar() {
    let url = this.router.url;
    url = url.replace('nuevo', 'lista');
    this.router.navigate([url]);
  }

  searchReniec(params: any) {
    if (params.target.value.length === 8 && this.registerForm.value.tipo_documento === this.documento_default) {

      this.disabled = true;
      
      this.registerForm.patchValue({
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
    });
      
    this.sharedService.getValidateReniec(params.target.value).subscribe({
        next: (res: any) => {
          console.log(res)

          this.registerForm.patchValue({
              nombres: res.nombres,
              apellido_paterno: res.apellidoPaterno,
              apellido_materno: res.apellidoMaterno,
          });
          this.disabled = false;
        },
        error: (err: any) => {
          this.disabled = false;
          console.log(err)
        }
      })
    }
  }
}
