import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
      {
        path: 'especialidades',
        loadChildren: () => import('./especialidades/especialidades.module').then( m => m.EspecialidadesModule)
      },
      {
        path: 'estudios-gabinete',
        loadChildren: () => import('./estudios-gabinete/estudios-gabinete-routing.module').then( m => m.EstudiosGabineteRoutingModule)
      },
      {
        path: 'diagnosticos',
        loadChildren: () => import('./diagnosticos/diagnosticos.module').then( m => m.DiagnosticosModule)
      },
      {
        path: 'diagnosticos',
        loadChildren: () => import('./diagnosticos/diagnosticos.module').then( m => m.DiagnosticosModule)
      },
      {
        path: 'indicaciones-medicas',
        loadChildren: () => import('./indicaciones-medicas/indicaciones-medicas.module').then( m => m.IndicacionesMedicasModule)
      },
      {
        path: 'medicamentos',
        loadChildren: () => import('./medicamentos/medicamentos.module').then( m => m.MedicamentosModule)
      },
      {
        path: 'tipos-citas',
        loadChildren: () => import('./tipos-citas/tipos-citas.module').then( m => m.TiposCitasModule)
      },
      {
        path: 'tipos-evaluaciones',
        loadChildren: () => import('./tipos-evaluaciones/tipos-evaluaciones.module').then( m => m.TiposEvaluacionesModule)
      },
      {
        path: 'analisis-clinicos',
        loadChildren: () => import('./analisis-clinicos/analisis-clinicos.module').then( m => m.AnalisisClinicosModule)
      },
      {
        path: 'examenes-laboratorio',
        loadChildren: () => import('./examenes-laboratorio/examenes-laboratorio.module').then( m => m.ExamenesLaboratorioModule)
      },
      {
        path: 'grupos-laboratorio',
        loadChildren: () => import('./grupos-laboratorio/grupos-laboratorio.module').then( m => m.GruposLaboratorioModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
