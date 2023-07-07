import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        EmpresasService,
        SharedService,
        AlertService
} from '../../../services/services.index';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})

export class EditarEmpresaComponent implements OnInit {

  slug: string;

  registro: any = {};

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
      public breadcrumbService: BreadcrumbsService,
      public mantenimientoService: MantenimientoService,
      public empresaService: EmpresasService,
      public sharedService: SharedService,
      public alertService: AlertService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
    this.breadcrumbService.title = 'EDITAR EMPRESA';
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getTiposDepartamentos();
    this.createFormControls();
    this.createForm();
    this.getRegistro();
  }

  getRegistro() {
    this.empresaService.getEmpresa(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.slug).subscribe({
      next: (res: any) => {
        this.registro = res;

        this.provincia_default = this.registro.cod_prov
        this.distrito_default = this.registro.ubigeo

        this.loadProvincia(this.registro.cod_depart);
        this.loadDistrito(this.registro.cod_depart, this.registro.cod_prov);

        this.registerForm.patchValue({
            ruc: this.registro.ruc,
            razon_social: this.registro.razon_social,
            nombre_comercial: this.registro.nombre_comercial,
            rubro: this.registro.rubro,
            email: this.registro.email,
            telefono: this.registro.telefono,
            contacto: this.registro.contacto,
            direccion: this.registro.direccion,
            departamento: this.registro.cod_depart,
            nota: this.registro.nota,
        })

      },
      error: (err: any) => {
        console.log('error', err)
      }
    })
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

  loadProvincia(cod_dep: string) {
    if (cod_dep) {
      this.departamento_default = cod_dep;
      this.getTiposProvincia(cod_dep);
    } 
  }

  changeProvince(e: any) {
    if (e.value) {
      this.provincia_default = e.value;
      this.getTiposDistritos(this.departamento_default, e.value);
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
                                      provincia: this.provincia_default,
                                      ubigeo: ''
                                  })

                              });
  }

  getTiposDistritos(cod_depart: string, cod_provin: string) {
    this.mantenimientoService.getTiposDistritos(cod_depart, cod_provin)
                             .subscribe({
                              next: (response: any) => {
                                  this.tipos_distritos = response.results;        
                                  
                                  this.registerForm.patchValue({
                                     ubigeo: this.distrito_default,
                                  })                         
                              }, 
                              error: err => console.log(err)
                             });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;
      this.empresaService.editEmpresa(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.registro.slug)
                          .subscribe({
                                      next: (res: any) => {
                                        this.alertService.successSwalToast('Empresa Editada', 2000);
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

  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/empresas/lista`;
    this.router.navigate([url]);
  }
}
