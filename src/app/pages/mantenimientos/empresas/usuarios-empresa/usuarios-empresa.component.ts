import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from '../../../../services/services.index';

@Component({
  selector: 'app-usuarios-empresa',
  templateUrl: './usuarios-empresa.component.html',
  styleUrls: ['./usuarios-empresa.component.scss']
})
export class UsuariosEmpresaComponent implements OnInit {
  public usuarios: any = [];

  @Input() empresa;
  @Output() submitChange = new EventEmitter();

  constructor(
          public usuarioService: UsuariosService,
  ) { }

  ngOnInit(): void {
     this.getUsuarios();
  }


  getUsuarios(url?) {
    this.usuarioService.getUsuariosActivos().subscribe((response: any) => {
      this.usuarios = response.results;
      this.getUsuariosEmpresa();
    });
  }

  getUsuariosEmpresa(url?) {
    this.usuarioService.getUsuariosActivosEmpresa(this.empresa.id).subscribe((response: any) => {
       for (let i = 0; i < response.length; i++) {
         let index = this.usuarios.findIndex(x => x.id === response[i].id);

         if (index>=0) {
           this.usuarios[index].boolean = true;
         }
       }

    });
  }

  changeAsignacion(user: any) {
    this.usuarioService.asignarUsuarioEmpresa(this.empresa, user).subscribe((response: any) => {

    });
  }

  cerrarModal(){
    this.submitChange.emit(true);
  }
}
