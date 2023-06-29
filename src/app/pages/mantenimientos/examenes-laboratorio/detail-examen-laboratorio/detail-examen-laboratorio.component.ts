import { Component, OnInit, ViewChild, OnDestroy, ViewContainerRef, Renderer2, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MDBModalRef, MDBModalService } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import { BreadcrumbsService, 
  MantenimientoService, 
  PacientesService,
  SharedService,
  AlertService
} from '../../../../services/services.index';

import { NuevoGrupoComponent } from '../nuevo-grupo/nuevo-grupo.component';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component';

@Component({
  selector: 'app-detail-examen-laboratorio',
  templateUrl: './detail-examen-laboratorio.component.html',
  styleUrls: ['./detail-examen-laboratorio.component.scss']
})
export class DetailExamenLaboratorioComponent {
  id: any;
  examen: any = {};
  public registros: any = [];

  modalRef: MDBModalRef;

  displayedColumns = ['', 'Grupo de Laboratorio', 'Análisis', ''];
  changeDetected: boolean = false;

  constructor(
    public breadcrumbService: BreadcrumbsService,
    public mantenimientoService: MantenimientoService,
    public pacienteService: PacientesService,
    private modalService: MDBModalService,
    public sharedService: SharedService,
    public alertService: AlertService,
    private renderer: Renderer2,
    private router: Router,
      private route: ActivatedRoute,
  ) { 
  }

  ngDoCheck() {
    if (!this.changeDetected) {
      if(this.sharedService.organizacion_seleccionada.id) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getRegistro();
        this.changeDetected = true;
      }
    }
  }

  getRegistro() {
    this.mantenimientoService.getExamenLaboratorio(this.id, this.sharedService.organizacion_seleccionada.id).subscribe({
      next: (res: any) => {
        this.examen = res;
        this.registros = res.grupos;
        this.breadcrumbService.title = this.examen.nombre;
        console.log(this.registros)
      },
    })
  }

  verDetalle(id: number) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/mantenimientos/examenes-laboratorio/${id}/detalle`;
    this.router.navigate([url])
  }

  regresar() {
    let url = this.router.url.split('/')[1];
    url = `/${url}/mantenimientos/examenes-laboratorio`;
    this.router.navigate([url])
  }

  openModal() {
    this.modalRef = this.modalService.show(NuevoGrupoComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: true,
                  class: 'modal-dialog modal-notify modal-primary modal-lg',
                  animated: true,
                  data: {
                      examen_id: this.id,
                      analisis_registrados: []
                  } 
              });

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
        if (result) {
          this.getRegistro();
        }
    });
  }

  editModal(registro: any): void {

    this.modalRef = this.modalService.show(EditGrupoComponent, {
                  backdrop: true,
                  keyboard: true,
                  focus: true,
                  show: false,
                  ignoreBackdropClick: true,
                  class: 'modal-dialog modal-notify modal-primary modal-lg',
                  animated: true,
                  data: {
                      registro: registro,
                      examen_id: this.id,
                      analisis_registrados: registro.analisis
                  }
              }
    );

    this.renderer.setStyle(document.querySelector('mdb-modal-container'), 'overflow-y', 'auto');

    this.modalRef.content.action.subscribe( (result: any) => {
      console.log('sii')
      console.log(result);

      if (result) {
        this.getRegistro();
      }
    });
  }

}
