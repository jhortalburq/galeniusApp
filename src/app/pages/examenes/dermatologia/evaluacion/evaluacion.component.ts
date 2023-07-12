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

  clave: string = 'dermatologia';
  programa: string = 'oc';

  registro: any = {};

  diagnosticos = []
  archivos = []

  disabled: boolean = false;

  options_aptitud = []
  options_responsables = []

  options_aspectos_generales = [
    {value: 'HUMEDAD', label: 'HUMEDAD'},
    {value: 'TEMPERATURA', label: 'TEMPERATURA'},
    {value: 'ESPESOR', label: 'ESPESOR'},
    {value: 'ELASTICIDAD', label: 'ELASTICIDAD'},
    {value: 'SENSABILIDAD', label: 'SENSABILIDAD'},
  ];

  options_tipo_lesion = [
    {value: 'PRIMARIA', label: 'PRIMARIA'},
    {value: 'SECUNDARIA', label: 'SECUNDARIA'},
  ];

  options_lesiones_primarias = [
    {value: 'MACULA', label: 'MACULA'},
    {value: 'PAPULA', label: 'PAPULA'},
    {value: 'PLACA', label: 'PLACA'},
    {value: 'NODULO', label: 'NODULO'},
    {value: 'PUSTULA', label: 'PUSTULA'},
    {value: 'ESCAMA', label: 'ESCAMA'},
    {value: 'TUBERCULO', label: 'TUBERCULO'},
    {value: 'QUERATOSIS', label: 'QUERATOSIS'},
    {value: 'VESICULA', label: 'VESICULA'},
    {value: 'PUTULA', label: 'PUTULA'},
    {value: 'VEGETACION', label: 'VEGETACION'},
  ];

  options_lesiones_secundarias = [
    {value: 'COSTRA', label: 'COSTRA'},
    {value: 'SOLUCION DE CONTINUIDAD', label: 'SOLUCION DE CONTINUIDAD'},
    {value: 'ESCLEROSIS', label: 'ESCLEROSIS'},
    {value: 'ESCARA', label: 'ESCARA'},
    {value: 'ESCAMA', label: 'ESCAMA'},
    {value: 'CICATRIZ', label: 'CICATRIZ'},
    {value: 'ATROFIA', label: 'ATROFIA'},
    {value: 'LIQUENIFICACION', label: 'LIQUENIFICACION'},
  ]

  options_sintomas_choices = [
    {value: 'PRURITO', label: 'PRURITO'},
    {value: 'DOLOR', label: 'DOLOR'},
    {value: 'LEVE', label: 'LEVE'},
    {value: 'MODERADO', label: 'MODERADO'},
    {value: 'SEVERO', label: 'SEVERO'},
    {value: 'OTRO', label: 'OTRO'},

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
                                  this.alertService.successSwalToast('Ficha Dermatológica Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
  }
}
