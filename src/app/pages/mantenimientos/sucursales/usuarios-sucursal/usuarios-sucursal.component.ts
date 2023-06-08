import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService, UsuariosService, EmpresaService } from '../../../../services/services.index';

@Component({
  selector: 'app-usuarios-sucursal',
  templateUrl: './usuarios-sucursal.component.html',
  styleUrls: ['./usuarios-sucursal.component.scss']
})
export class UsuariosSucursalComponent implements OnInit {

  public usuarios: any = [];

  @Input() sucursal;
  @Output() submitChange = new EventEmitter();

  constructor(
          public usuarioService: UsuariosService,
          public empresaService: EmpresaService,
  ) { }

  ngOnInit(): void {
     this.getUsuarios();
  }


  getUsuarios(url?) {
    this.usuarioService.getUsuariosActivos(this.empresaService.empresa_seleccionada.id).subscribe((response: any) => {
      this.usuarios = response;
      this.getUsuariosSucursal();
    });
  }

  getUsuariosSucursal(url?) {
    this.usuarioService.getUsuariosActivosSucursal(this.sucursal.id, this.empresaService.empresa_seleccionada.id).subscribe((response: any) => {
       for (let i = 0; i < response.length; i++) {
         let index = this.usuarios.findIndex(x => x.id === response[i].id);

         if (index>=0) {
           this.usuarios[index].boolean = true;
         }
       }

    });
  }

  changeAsignacion(user: any) {
    this.usuarioService.asignarUsuarioSucursal(this.sucursal, this.empresaService.empresa_seleccionada.id, user).subscribe((response: any) => {

    });
  }

  cerrarModal(){
    this.submitChange.emit(true);
  }

}
