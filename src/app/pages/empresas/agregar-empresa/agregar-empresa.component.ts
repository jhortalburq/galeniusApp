import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


import { 
  SharedService,
  MantenimientoService, 
  EmpresasService, 
  AlertService,
  NotificationsService,
  BreadcrumbsService
} from '../../../services/services.index';


@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.scss']
})
export class AgregarEmpresaComponent implements OnInit {
 
  registerForm: FormGroup;

  razon_social: FormControl;
  nombre_comercial: FormControl;
  ruc: FormControl;
  rubro: FormControl;
  departamento: FormControl;
  provincia: FormControl;
  ubigeo: FormControl;
  direccion: FormControl;
  contacto: FormControl;
  nota: FormControl;

  disabled: boolean = false;

  telefono: FormControl;
  email: FormControl;

  departamento_default: string = '';
  provincia_default: string = '';
  distrito_default: string = '';

  tipos_departamentos: any = [];
  tipos_provincias: any = [];
  tipos_distritos: any = [];

  constructor(
        public sharedService: SharedService,
        public notificationService: NotificationsService,
        public mantenimientoService: MantenimientoService,
        public empresaService: EmpresasService,
        public alertService: AlertService,
        public breadcrumbService: BreadcrumbsService,
        public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getTiposDepartamentos();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.razon_social = new FormControl('', Validators.required);
    this.nombre_comercial = new FormControl('');
    this.rubro = new FormControl('');
    this.ruc = new FormControl('', [Validators.required,
                                    Validators.maxLength(11),
                                    Validators.minLength(11),
                                    Validators.pattern('[0-9 ]*')
                                  ]);
    this.direccion = new FormControl('');
    this.departamento = new FormControl('');
    this.provincia = new FormControl('');
    this.ubigeo = new FormControl('');
    this.contacto = new FormControl('');
    this.telefono = new FormControl('');
    this.nota = new FormControl('');
    this.email = new FormControl('', Validators.email);
  }

  createForm() {
     this.registerForm = new FormGroup({
        razon_social: this.razon_social,
        rubro: this.rubro,
        nombre_comercial: this.nombre_comercial,
        ruc: this.ruc,
        direccion: this.direccion,
        telefono: this.telefono,
        email: this.email,
        departamento: this.departamento,
        provincia: this.provincia,
        ubigeo: this.ubigeo,
        nota: this.nota,
        contacto: this.contacto
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
        this.disabled = true;
        window.scroll(0,0);
        this.empresaService.addEmpresa(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Empresa Registrada', 2000);
                                        this.disabled = false;

                                        setTimeout(() => {
                                            this.router.navigate(['/', this.breadcrumbService.modulo.toLowerCase(), 'empresas', res.slug, 'editar']);
                                        }, 500)
                                      },
                                      error: (err: any) => {
                                        this.disabled = false;
                                        console.log('error')
                                      }
                                    })
    }
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
      this.distrito_default = '';
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
                                  provincia: this.provincia_default,
                                  ubigeo: ''
                                })

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

  regresar() {
    let url = this.router.url;
    url = url.replace('nuevo', 'lista');
    this.router.navigate([url]);
  }
  
  searchSunat(params: any) {
    if (params.target.value.length === 11) {
      this.disabled = true;
      
      this.departamento_default = '';
      this.provincia_default = '';

      this.registerForm.patchValue({
        razon_social: '',
        direccion: '',
        departamento: '',
        provincia: '',
        ubigeo: ''
    });
      
      this.sharedService.getValidateSunat(params.target.value).subscribe({
        next: (res: any) => {
          console.log(res)
          console.log(this.distrito_default)
          this.provincia_default = res.cod_provin
          this.distrito_default = res.ubigeo

          this.loadProvincia(res.cod_depart);
          this.loadDistrito(res.cod_depart, res.cod_provin);
          
          this.registerForm.patchValue({
              razon_social: res.razonSocial,
              direccion: res.direccion,
              departamento: res.cod_depart,
              provincia: res.cod_provin
          });
          this.disabled = false;
          console.log(this.distrito_default)
        },
        error: (err: any) => {
          this.disabled = false;
          console.log(err)
        }
      })
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
}
