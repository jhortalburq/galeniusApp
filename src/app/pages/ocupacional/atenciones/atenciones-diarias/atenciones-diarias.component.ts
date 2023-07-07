import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService, AdmisionService, SharedService } from '../../../../services/services.index';

@Component({
  selector: 'app-atenciones-diarias',
  templateUrl: './atenciones-diarias.component.html',
  styleUrls: ['./atenciones-diarias.component.scss']
})
export class AtencionesDiariasComponent {
  total: number = 0;
  page: number = 1;
  perPage: number = 15;

  nextURL: string = '';
  prevURL: string = '';

  registros: any = [];

  is_loading: boolean = false;

  displayedColumns = [
    '',
    'Nro Orden',
    'Paciente',
    'Empresa',
    'Fecha de Atención', 
    'Tipo de Evaluación',
    'Hoja de Ruta',
    'Consent. Inf',
    'Estado',
    'Creado Por',
    'Ult Modificación',
    ''
  ];

  constructor(
      public breadcrumbService: BreadcrumbsService,
      public admisionService: AdmisionService,
      public sharedService: SharedService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.breadcrumbService.title = 'ATENCIONES DIARIAS';
  }

  getData(url?) {
    if (url) {
      this.admisionService.getAtencionesURL(url, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
              .subscribe({
                next: (response: any) => {
                        this.registros = response.results;
                        this.nextURL = response.next;
                        this.prevURL = response.previous;
                        this.total = response.count;
                    },
                  error: (error: any) => {
                    if (error.status === 401) {
                      localStorage.removeItem('token');
                      this.router.navigate(['/login']);
                    }
                  }
                });
            } else {
                this.admisionService.getAtenciones(this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc').subscribe({
                  next: (response: any) => {
                        this.registros = response.results;
                        this.nextURL = response.next;
                        this.prevURL = response.previous;
                        this.total = response.count;
                    },
                  error: (error: any) => {
                    if (error.status === 401) {
                      localStorage.removeItem('token');
                      this.router.navigate(['/login']);
                    }
                  }
                });
            }
  }


  onNext(): void {
    if (!this.lastPage()){
        this.page += 1
        this.getData(this.nextURL)
    }
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.total;
  }

  onPrev(): void {
    if (this.page >1){
        this.page -= 1
        this.getData(this.prevURL)
    }
  }

  nuevoRegistro() {
    let url = this.router.url.split('/')[1];
    url = `/${url}/admision/nueva-atencion`;
    this.router.navigate([url])
  }

  editarRegistro(slug: string) {
    let url = this.router.url.split('/')[1];
    url = `/${url}/admision/${slug}/editar`;
    this.router.navigate([url])
  }

  HojaRutaPDF(slug: string ){
    this.is_loading = true;

    this.admisionService.downloadHojaRutaPDF(slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
      .subscribe({
          next: (res: any) => this.downloadFile(res),
          error: (err: any) => {
            this.is_loading = false;
          }
      })
  }

  ConsentimientoPDF(slug: string ){
    this.is_loading = true;

    this.admisionService.downloadConsentimientoPDF(slug, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, 'oc')
      .subscribe({
          next: (res: any) => this.downloadFile(res),
          error: (err: any) => {
            this.is_loading = false;
          }
      })
  }

  downloadFile(res: any) {
    var data = this.base64toBlob(res.file, { type: 'application/pdf'})

    var fileUrl = window.URL.createObjectURL(data);

    var a = document.createElement('a');
       document.body.appendChild(a);
       a.setAttribute('style', 'display: none');
       a.href = fileUrl;
       a.download = res.filename;
       a.click();
       window.URL.revokeObjectURL(fileUrl);
       a.remove(); // remove the element

       this.is_loading = false;

    }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
