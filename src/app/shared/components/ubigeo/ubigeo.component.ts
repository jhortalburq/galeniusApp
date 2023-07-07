import { Component } from '@angular/core';

import { MantenimientoService } from '../../../services/services.index';

import {
  FormGroup,
  FormControl,
} from '@angular/forms';


@Component({
  selector: 'app-ubigeo',
  templateUrl: './ubigeo.component.html',
  styleUrls: ['./ubigeo.component.scss']
})
export class UbigeoComponent {
  registerForm: FormGroup;

  departamento_default: string = '';
  provincia_default: string = '';
  distrito_default: string = '';

  tipos_departamentos: any = [];
  tipos_provincias: any = [];
  tipos_distritos: any = [];

  departamento: FormControl;
  provincia: FormControl;
  ubigeo: FormControl;

  constructor(
    public mantenimientoService: MantenimientoService,
  ) {}

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

  getTiposDepartamentos() {
    this.mantenimientoService.getTiposDepartamento()
                             .subscribe((response: any) => {
                                  this.tipos_departamentos = response.results
                              });
  }

  getTiposProvincia(cod_depart: string) {

    this.mantenimientoService.getTiposProvincia(cod_depart)
                             .subscribe((response: any) => {
                                this.tipos_provincias = response.results
                                this.tipos_distritos = [];

                                // this.registerForm.patchValue({
                                //   ubigeo: '',
                                //   provincia: ''
                                // })

                              });
  }

  getTiposDistritos(cod_depart: string, cod_provin: string) {

    this.mantenimientoService.getTiposDistritos(cod_depart, cod_provin)
                             .subscribe((response: any) => {
                                this.tipos_distritos = response.results
 
                                // this.registerForm.patchValue({
                                //   ubigeo: '',
                                // })
                              });
  }

}
