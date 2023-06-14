import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public router: Router) { }

  errorSwal(message, title) {
        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: "#59698d",
      });
  }

  successSwalToast(title: string, url: any) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          
          setTimeout(() => {
              this.router.navigate(url);
           }, 1500)

        }
    });
      
    Toast.fire({
      icon: 'success',
      title: title
    })
  }
}
