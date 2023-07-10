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

  registro: any = {
      diagnosticos: [], 
      otros_diagnosticos: [],
      archivos: [],
  };

  disabled: boolean = false;

  options_aptitud = []
  options_responsables = []

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    private router: Router,
    public alertService: AlertService,
  ) {}

  async ngOnInit() {
      // this.createFormControls();
      // this.createForm();

      // const choices$ = this.empresaService.getEmpresasForm(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id);
      // let choices = await lastValueFrom(choices$);

      // this.choices_empresas = choices.results;
      this.getRegistro();
    }

  async getRegistro() {
      // const info$ = this.admisionService.getInfoLaboral(this.slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc');
      // let info_laboral = await lastValueFrom(info$);
      // this.registerForm.patchValue({
      //     empresa: info_laboral.empresa,
      //     ruc: info_laboral.ruc,
      //     rubro: info_laboral.rubro,
      //     departamento: info_laboral.departamento,
      //     provincia: info_laboral.provincia,
      //     distrito: info_laboral.distrito,
      //     direccion: info_laboral.direccion,
      //     area_trabajo: info_laboral.area_trabajo,
      //     fecha_inicio: info_laboral.fecha_inicio,
      //     tiempo_laborando: info_laboral.tiempo_laborando,
      //     ocupacion: info_laboral.ocupacion,
      //     puesto_postula: info_laboral.puesto_postula,
      //     principales_riesgos: info_laboral.principales_riesgos,
      //     medidas_seguridad: info_laboral.medidas_seguridad,
      //     info: info_laboral.id
      // })
  }

  // createFormControls() {
  //     this.anamnesis = new FormControl('');
  //     this.ectoscopia = new FormControl('');
  //     this.estado_mental = new FormControl('');
  // }

  // createForm() {
  //   this.registerForm = new FormGroup({
  //     anamnesis: this.anamnesis,
  //     ectoscopia: this.ectoscopia,
  //     estado_mental: this.estado_mental,
  //   });
  // }
  
  regresar() {
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/ficha_medica/lista`;
    this.router.navigate([url]);
  }

  onSubmit() {
        this.disabled = true;
        window.scroll(0,0);
    
        // this.admisionService.updateinfoLaboralPaciente(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc', this.slug)
        //                     .subscribe({
        //                         next: (res: any) => {
        //                           this.disabled = false;
        //                           this.submitChange.emit(true);
        //                           this.alertService.successSwalToast('Información Laboral Actualizada', 2000);
        //                         },
        //                         error: (err: any) => {
        //                           console.log('error')
        //                           this.disabled = false;
        //                         }
        //                     })
  }
}
