/* tslint:disable:no-inferrable-types */
import { SafeHtml } from '@angular/platform-browser';

import { Subject, Observable } from 'rxjs';

import { ComponentType } from '../portal/portal';
import { ToastRef } from './toast-ref';

/**
 * Configuration for an individual toast.
 */
export interface IndividualConfig {
  /**
   * toast time to live in milliseconds
   * default: 5000
   */
  timeOut?: number | any;
  /**
   * toast show close button
   * default: false
   */
  closeButton?: boolean;
  /** time to close after a user hovers over toast */
  /**
   * show toast progress bar
   * default: false
   */
  extendedTimeOut?: number | any;
  /**
   * show toast progress bar
   * default: false
   */
  progressBar?: boolean;
  /**
   * render html in toast message (possibly unsafe)
   * default: false
   */
  enableHtml?: boolean;
  /**
   * css class on toast component
   * default: toast
   */
  toastClass?: string;
  /**
   * css class on toast container
   * default: toast-top-right
   */
  positionClass?: string | any;
  /**
   * css class on to toast title
   * default: toast-title
   */
  titleClass?: string;
  /**
   * css class on to toast title
   * default: toast-title
   */
  messageClass?: string;
  /**
   * clicking on toast dismisses it
   * default: true
   */
  tapToDismiss?: boolean;
  /**
   * Angular toast component to be shown
   * default: Toast
   */
  toastComponent?: ComponentType<any> | any;
  /**
   * Helps show toast from a websocket or from event outside Angular
   * default: false
   */
  onActivateTick?: boolean;
  /**
   * actionButton - Field will create action button in toast, and assing parameter's value as button text
   */
  actionButton?: string;
  /**
   * - Adds class to the toast action button
   */
  actionButtonClass?: string;
  opacity?: number;
}

export interface ToastIconClasses {
  error?: string;
  info?: string;
  success?: string;
  warning?: string;
}

/**
 * Global Toast configuration
 * Includes all IndividualConfig
 */
export interface GlobalConfig extends IndividualConfig {
  /**
   * max toasts opened. Toasts will be queued
   * Zero is unlimited
   * default: 0
   */
  maxOpened?: number;
  /**
   * dismiss current toast when max is reached
   * default: false
   */
  autoDismiss?: boolean;
  iconClasses?: ToastIconClasses;
  /**
   * New toast placement
   * default: true
   */
  newestOnTop?: boolean;
  /**
   * block duplicate messages
   * default: false
   */
  preventDuplicates?: boolean;
  opacity?: number;
}
/**
 * Remove warning message from angular-cli
 */
export class GlobalConfig {}
/**
 * Everything a toast needs to launch
 */
export class ToastPackage {
  private _onTap: Subject<void> = new Subject();
  private _onAction: Subject<void> = new Subject();

  constructor(
    public toastId: number,
    public config: IndividualConfig,
    public message: string | SafeHtml,
    public title: string,
    public toastType: string,
    public toastRef: ToastRef<any>
  ) {}

  /** Fired on click */
  triggerTap() {
    this._onTap.next();
    this._onTap.complete();
  }

  onTap(): Observable<any> {
    return this._onTap.asObservable();
  }

  /** available for use in custom toast */
  triggerAction(action?: any) {
    this._onAction.next(action);
    this._onAction.complete();
  }

  onAction(): Observable<any> {
    return this._onAction.asObservable();
  }
}

export const tsConfig = {
  serviceInstance: new Object(),
};
