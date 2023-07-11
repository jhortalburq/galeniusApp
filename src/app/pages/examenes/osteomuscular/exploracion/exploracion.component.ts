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
  selector: 'app-exploracion',
  templateUrl: './exploracion.component.html',
  styleUrls: ['./exploracion.component.scss']
})
export class ExploracionComponent {
  @Output() submitChange = new EventEmitter();
  @Input() slug;

  clave: string = 'osteomuscular';
  programa: string = 'oc';

  registro: any = {};

  diagnosticos = [];
  archivos = [];

  disabled: boolean = false;

  options_aptitud = [];
  options_responsables = [];


  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    public mantenimientoService: MantenimientoService,
    private router: Router,
    public examenesService: ExamenesService,
    public alertService: AlertService,
  ) {}

  async ngOnInit() {
  }

  async getRegistro() {
      const info$ = this.examenesService.getExploracionFisicoOsteo(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.clave, this.programa, this.slug);
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

        this.examenesService.updateExploracionOsteo(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.programa, this.clave, this.slug, this.registro)
                            .subscribe({
                                next: (res: any) => {
                                  this.disabled = false;
                                  this.submitChange.emit(true);
                                  this.alertService.successSwalToast('Ficha Osteomuscular Actualizada', 2000);
                                },
                                error: (err: any) => {
                                  console.log('error')
                                  this.disabled = false;
                                }
                            })
  }

}
