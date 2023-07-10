import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { BreadcrumbsService, 
         SharedService,
         AlertService,
         MantenimientoService,
         ExamenesService
} from '../../../../services/services.index';

import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-diagnosticos-fichas',
  templateUrl: './diagnosticos-fichas.component.html',
  styleUrls: ['./diagnosticos-fichas.component.scss']
})

export class DiagnosticosFichasComponent {
  @Input() registros;

  options = [
    {value: 1, label: 'P'},
    {value: 2, label: 'D'},
    {value: 3, label: 'R'}
  ]

  registerForm: FormGroup;
  disabled: boolean = false;

  pdr: FormControl;
  diagnostico: FormControl;
  
  choices_diagnosticos: any = [];
  maxResults = 10;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public sharedService: SharedService,
    public alertService: AlertService,
    public mantenimientoService: MantenimientoService,
    public router: Router,
    public examenesService: ExamenesService,
  ) {}

  async ngOnInit() {
      this.getChoicesDiagnostico();
      this.createFormControls();
      this.createForm();
  }

  ngOnChanges() {
    this.getRegistro();
  }
  
  getRegistro() {
    console.log('¿aaaa')
  }

  createFormControls() {
      this.diagnostico = new FormControl('', Validators.required);
      this.pdr = new FormControl(1);
  }

  createForm() {
    this.registerForm = new FormGroup({
      diagnostico: this.diagnostico,
      pdr: this.pdr,
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
    

    }
  }

  eliminarItem(item_id: number) {

  }

  _searchDiagnostico(item: any) {
    this.getChoicesDiagnostico(item.search);
  }

  getChoicesDiagnostico(params?: string) {
    return this.mantenimientoService.getDataFormMantenimiento('diagnosticos', this.sharedService.organizacion_seleccionada.id, params)
          .subscribe((response: any) => {
             this.choices_diagnosticos = response.results;
             console.log(this.choices_diagnosticos)
           });
  }


  _focus(item: any) {
    this.getChoicesDiagnostico();
  }

}
