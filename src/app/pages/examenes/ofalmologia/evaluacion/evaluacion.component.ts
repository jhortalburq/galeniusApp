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

  clave: string = 'oftalmologia';
  programa: string = 'oc';

  registro: any = {};

  diagnosticos_izq = []
  diagnosticos_der = []
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
  }

  async getRegistro() {
      const info$ = this.examenesService.getDetalleFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
      this.registro = await lastValueFrom(info$);
  }

  async getRegistroDiagnosticosIzq() {
    const info$ = this.examenesService.getOfaltmoDiagnosticosIzqFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _diagnosticos_izq = await lastValueFrom(info$);
    this.diagnosticos_izq = _diagnosticos_izq.results;
  }

  async getRegistroDiagnosticosDer() {
    const info$ = this.examenesService.getOfaltmoDiagnosticosDerFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _diagnosticos_der = await lastValueFrom(info$);
    this.diagnosticos_der = _diagnosticos_der.results;
  }

  async getRegistroArchivos() {
    const info$ = this.examenesService.getArchivosFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
    let _archivos = await lastValueFrom(info$);
    this.archivos = _archivos.results;
  }

  onSubmitDiagnosticoIzq(item: any) {
    this.getRegistroDiagnosticosIzq();
  }

  onSubmitDiagnosticoDer(item: any) {
    this.getRegistroDiagnosticosDer();
  }

  onSubmitArchivo(item: any) {
    this.getRegistroArchivos();
  }

  ngOnChanges() {
    this.getRegistro();
    this.getRegistroDiagnosticosIzq();
    this.getRegistroDiagnosticosDer();
    this.getRegistroArchivos();
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
                                  this.alertService.successSwalToast('Ficha Oftalmológica Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
  }
}
