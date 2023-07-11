import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BreadcrumbsService, 
        SharedService,
        AlertService,
        ExamenesService,
        MantenimientoService
} from '../../../../services/services.index';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent {
  @Output() submitChange = new EventEmitter();
  @Input() slug;

  clave: string = 'espirometria';
  programa: string = 'oc';

  registro: any = {};

  diagnosticos = [];
  archivos = [];

  disabled: boolean = false;

  options_aptitud = [];
  options_responsables = [];

  tipos_departamentos: any = [];
  tipos_provincias: any = [];
  tipos_distritos: any = [];

  options_etnia = [
    {value: 'Caucásico', label: 'Caucásico'},
    {value: 'No Caucásico', label: 'No Caucásico'},
  ]

  options_fumador = [
    {value: 'Si', label: 'Si'},
    {value: 'No', label: 'No'},
  ]

  departamento_default: string = '';
  provincia_default: string = '';
  distrito_default: string = '';

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    public mantenimientoService: MantenimientoService,
    private router: Router,
    public examenesService: ExamenesService,
    public alertService: AlertService,
  ) {}

  async ngOnInit() {
    this.getTiposDepartamentos();
  }

  async getRegistro() {
      const info$ = this.examenesService.getDetalleFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
      this.registro = await lastValueFrom(info$);

      const provincias$ = this.mantenimientoService.getTiposProvincia(this.registro.cod_depart);
      this.tipos_provincias = await lastValueFrom(provincias$).then(response => response.results);

      const distritos$ = this.mantenimientoService.getTiposDistritos(this.registro.cod_depart, this.registro.cod_prov);
      this.tipos_distritos = await lastValueFrom(distritos$).then(response => response.results);

  }

  async getRegistroDiagnosticos() {
    const info$ = this.examenesService.getDiagnosticosFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _diagnosticos = await lastValueFrom(info$);
    this.diagnosticos = _diagnosticos.results;
  }

  async getRegistroArchivos() {
    const info$ = this.examenesService.getArchivosFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _archivos = await lastValueFrom(info$);
    this.archivos = _archivos.results;
  }

  onSubmitDiagnostico(item: any) {
    this.getRegistroDiagnosticos();
  }

  onSubmitArchivo(item: any) {
    this.getRegistroArchivos();
  }

  ngOnChanges() {
    this.getRegistro();
    this.getRegistroDiagnosticos();
    this.getRegistroArchivos();
  }
  
  getTiposDepartamentos() {
    this.mantenimientoService.getTiposDepartamento()
                             .subscribe((response: any) => {
                                  this.tipos_departamentos = response.results
                              });
  }
  
  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/${this.clave}/lista`;
    this.router.navigate([url]);
  }

   onSubmit() {
        this.disabled = true;
        window.scroll(0,0);
        console.log(this.registro);

        this.examenesService.updateEvaluacionFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa, this.clave, this.slug, this.registro)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.submitChange.emit(true);
                                  this.alertService.successSwalToast('Ficha Espirometría Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
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

  getTiposProvincia(cod_depart: string, cod_provin?) {

    this.mantenimientoService.getTiposProvincia(cod_depart)
                             .subscribe((response: any) => {
                                this.tipos_provincias = response.results
                                this.tipos_distritos = [];

                              });
  }

  getTiposDistritos(cod_depart: string, cod_provin: string) {

    this.mantenimientoService.getTiposDistritos(cod_depart, cod_provin)
                             .subscribe((response: any) => {
                                this.tipos_distritos = response.results
                              });
  }
}
