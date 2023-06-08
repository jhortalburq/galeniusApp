import { Injectable } from '@angular/core';

import { ToastService } from '../../../ng-uikit-pro-standard/src/public_api';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  public options = { opacity: 1, closeButton: true};

  constructor(private toastrService: ToastService) {}

  showSuccess(message, title) {
      this.toastrService.success(message, title, this.options);
  }

  showError(message, title) {
      this.toastrService.error(message, title, this.options);
  }

  showInfo(message, title) {
      this.toastrService.info(message, title, this.options);
  }

  showWarning(message, title) {
      this.toastrService.warning(message, title, this.options);
  }
}
