import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public router: Router) { }

  successSwal(message: string, title: string) {
      Swal.fire({
          title: title,
          text: message,
          icon: 'success',
          confirmButtonText: 'Cerrar'
      });
  }

  warningSwal(message: string, title: string) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        confirmButtonText: 'Cerrar'
    });
}

  errorSwal(message: string, title: string) {
        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: "#59698d",
      });
  }

  successSwalToast(title: string, time: number) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
      
    Toast.fire({
      icon: 'success',
      title: title
    })
  }
}
