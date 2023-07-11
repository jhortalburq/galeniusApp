import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BreadcrumbsService, 
        SharedService,
        AlertService,
        ExamenesService
} from '../../../../services/services.index';

import { lastValueFrom } from 'rxjs';
import { V } from 'ng-uikit-pro-standard/src/lib/free/utils/keyboard-navigation';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})

export class EvaluacionComponent {
  @Output() submitChange = new EventEmitter();
  @Input() slug;

  clave: string = 'radiologia';
  programa: string = 'oc';

  registro: any = {};

  diagnosticos = []
  archivos = []

  disabled: boolean = false;

  options_aptitud = []
  options_responsables = []

  options_calidad = [
    {value: 1, label: 'Buena'},
    {value: 2, label: 'Aceptable'},
    {value: 3, label: 'Baja Calidad'},
    {value: 4, label: 'Inaceptable'}
  ]

  options_zona_afectada = [
    {value: 1, label: 'Derecho'},
    {value: 2, label: 'Izquierdo'},
    {value: 3, label: 'Ambos'}
  ]

  options_profusion_choices = [
    {value: 1, label: '0/-'},
    {value: 2, label: '0/0'},
    {value: 3, label: '0/1'},
    {value: 4, label: '1/0'},
    {value: 5, label: '1/1'},
    {value: 6, label: '1/2'},
    {value: 7, label: '2/1'},
    {value: 8, label: '2/3'},
    {value: 9, label: '2/3'},
    {value: 10, label: '3/2'},
    {value: 11, label: '3/3'},
    {value: 12, label: '3/+'},
  ]

  options_choices = [
    {value: 'p', label: 'p'},
    {value: 'q', label: 'q'},
    {value: 'r', label: 'r'},
    {value: 's', label: 's'},
    {value: 't', label: 't'},
    {value: 'u', label: 'u'},
  ]

  options_opacidades = [
    {value: '0', label: '0'},
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'C', label: 'C'},
  ]

  options_no_si = [
    {value: 'Si', label: 'Si'},
    {value: 'No', label: 'No'},
  ]

  options_oid_choices = [
    {value: 1, label: '0'},
    {value: 2, label: 'D'},
    {value: 3, label: 'I'},
  ]

  options_ancho_choices = [
    {value: '0', label: '0'},
    {value: 'a', label: 'a'},
    {value: 'b', label: 'b'},
    {value: 'c', label: 'c'},
  ]

  options_extension_choices = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
  ]
  
  options_simbolo_choices = [
    {value: 'aa', label: 'aa'},
    {value: 'at', label: 'at'},
    {value: 'ax', label: 'ax'},
    {value: 'bu', label: 'bu'},
    {value: 'ca', label: 'ca'},
    {value: 'cg', label: 'cg'},
    {value: 'cn', label: 'cn'},
    {value: 'co', label: 'co'},
    {value: 'cp', label: 'cp'},
    {value: 'cv', label: 'cv'},
    {value: 'di', label: 'di'},
    {value: 'ef', label: 'ef'},
    {value: 'em', label: 'em'},
    {value: 'es', label: 'es'},
    {value: 'fr', label: 'fr'},
    {value: 'hi', label: 'hi'},
    {value: 'ho', label: 'ho'},
    {value: 'id', label: 'id'},
    {value: 'ih', label: 'ih'},
    {value: 'kl', label: 'kl'},
    {value: 'me', label: 'me'},
    {value: 'pa', label: 'pa'},
    {value: 'pb', label: 'pb'},
    {value: 'pi', label: 'pi'},
    {value: 'px', label: 'px'},
    {value: 'ra', label: 'ra'},
    {value: 'rp', label: 'rp'},
    {value: 'tb', label: 'tb'},
    {value: 'od', label: 'od'},
  ]

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
                                  this.alertService.successSwalToast('Ficha Radiologia OIT Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
  }
}
