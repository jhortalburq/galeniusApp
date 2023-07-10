import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BreadcrumbsService, 
        SharedService,
        AlertService,
        ExamenesService
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

  clave: string = 'emo';
  programa: string = 'oc';

  registro: any = {};

  diagnosticos = []
  otros_diagnosticos = []
  archivos = []

  disabled: boolean = false;

  options_aptitud = []
  options_responsables = []

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    private router: Router,
    public examenesService: ExamenesService,
    public alertService: AlertService,
  ) {}

  async ngOnInit() {
    this.alertService.warningSwalToast('Cargando Ficha Médica', 2000);
  }

  async getRegistro() {
      const info$ = this.examenesService.getDetalleFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
      this.registro = await lastValueFrom(info$);
      console.log('reg', this.registro)
  }

  async getRegistroDiagnosticos() {
    const info$ = this.examenesService.getDiagnosticosFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _diagnosticos = await lastValueFrom(info$);
    this.diagnosticos = _diagnosticos.results;
    console.log('reg2', this.diagnosticos)
  }


  async getRegistroOtrosDiagnosticos() {
    const info$ = this.examenesService.getOtrosDiagnosticosFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _otros_diagnosticos = await lastValueFrom(info$);
    this.otros_diagnosticos = _otros_diagnosticos.results;
    console.log('reg3', this.otros_diagnosticos)
  }


  async getRegistroArchivos() {
    const info$ = this.examenesService.getArchivosFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _archivos = await lastValueFrom(info$);
    this.archivos = _archivos.results;
    console.log('4', this.archivos)
  }

  onSubmitDiagnostico(item: any) {
    this.getRegistroDiagnosticos();
  }

  onSubmitOtroDiagnostico(item: any) {
    this.getRegistroOtrosDiagnosticos();
  }

  onSubmitArchivo(item: any) {
    this.getRegistroArchivos();
  }

  ngOnChanges() {
    this.getRegistro();
    this.getRegistroDiagnosticos();
    this.getRegistroOtrosDiagnosticos();
    this.getRegistroArchivos();
  }
  
  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
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
                                  this.alertService.successSwalToast('Ficha Médica Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
  }
}
