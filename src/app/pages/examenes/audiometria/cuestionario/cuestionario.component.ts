import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BreadcrumbsService, 
        SharedService,
        AlertService,
        ExamenesService
} from '../../../../services/services.index';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss']
})
export class CuestionarioComponent {
  @Output() submitChange = new EventEmitter();
  @Input() slug;

  clave: string = 'audiometria';
  programa: string = 'oc';

  registro: any = {};

  disabled: boolean = false;

  diagnosticos = []
  archivos = []

  options_aptitud = []
  options_responsables = []

  options_si_no = [
    {value: 'Si', label: 'Si'},
    {value: 'No', label: 'No'},
  ]
  
  options_normal_anormal = [
    {value: 'Normal', label: 'Normal'},
    {value: 'Anormal', label: 'Anormal'},
  ]

  options_uso_protectores = [
    {value: 'Tapones', label: 'Tapones'},
    {value: 'Orejeras', label: 'Orejeras'},
    {value: 'Doble Protección', label: 'Doble Protección'},
  ]

  options_antecedente_ruido = [
    {value: 'Ruido muy Intenso', label: 'Ruido muy Intenso'},
    {value: 'Ruido Moderado', label: 'Ruido Moderado'},
    {value: 'Ruido No Molesto', label: 'Ruido No Molesto'},
  ]

  options_tipo_exposicion = [
    {value: 'Maquinarias', label: 'Maquinarias'},
    {value: 'Motores', label: 'RuidMotores'},
    {value: 'Ambos', label: 'Ambos'},
  ]

  options_ruido_exposicion = [
    {value: 'Frecuente', label: 'Frecuente'},
    {value: 'Eventual', label: 'Eventual'},
    {value: 'Constante', label: 'Constante'},
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
      const info$ = this.examenesService.getDetalleCuestionario(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
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

        this.examenesService.updateCuestionarioFicha(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa, this.clave, this.slug, this.registro)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.submitChange.emit(true);
                                  this.alertService.successSwalToast('Cuestionario Audiometría Actualizado', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
  }
}
