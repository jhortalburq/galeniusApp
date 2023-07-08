import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { BreadcrumbsService, 
        MantenimientoService, 
        SharedService,
        EmpresasService,
        AlertService
} from '../../../services/services.index';

@Component({
  selector: 'app-datos-laborales',
  templateUrl: './datos-laborales.component.html',
  styleUrls: ['./datos-laborales.component.scss']
})
export class DatosLaboralesComponent {
  registerForm: FormGroup;

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

  choices_empresas: any = [];

  maxResults = 10;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public empresaService: EmpresasService,
    public sharedService: SharedService,
    public alertService: AlertService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getChoicesEmpresas();
      this.createFormControls();
      this.createForm();
    }

  createFormControls() {
      this.empresa = new FormControl('', Validators.required);
      
      this.ruc = new FormControl('');
      this.rubro = new FormControl('');
      this.provincia = new FormControl('');
      this.departamento = new FormControl('');
      this.distrito = new FormControl('');
      this.direccion = new FormControl('');

      this.area_trabajo = new FormControl('');
      this.fecha_inicio = new FormControl('');
      this.tiempo_laborando = new FormControl('');
      this.ocupacion = new FormControl('');
      this.puesto_postula = new FormControl('');
      this.principales_riesgos = new FormControl('');
      this.medidas_seguridad = new FormControl('');

  }

  createForm() {
    this.registerForm = new FormGroup({
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
    });
  }

  getChoicesEmpresas(params?: string) {
    return this.empresaService.getEmpresasForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, params)
          .subscribe((response: any) => {
             this.choices_empresas = [];

             for (let i = 0; i < response.results.length; i++) {
               this.choices_empresas.push({value: response.results[i].id, label: response.results[i].razon_social})
             }
           });

  }

  _searchEmpresa(item: any) {
    this.getChoicesEmpresas(item.search)
  }

  _focus(item: any) {
    this.getChoicesEmpresas()
  }


}
