import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule, ToastService } from '../../ng-uikit-pro-standard/src/lib/pro/alerts';
import { MDBBootstrapModulesPro } from '../../ng-uikit-pro-standard/src/lib/mdb.module';
import { MDBSpinningPreloader } from '../../ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';

import { PagesModule } from './pages/pages.module';
import { ServicesModule } from './services/services.module';

import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot({
                                    timeOut: 2500,
                                    positionClass: 'md-toast-bottom-right',
                                    closeButton: true,
                                    iconClasses: {
                                      warning: 'md-toast-red',
                                    }
                                }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    ServicesModule,
  ],
  providers: [MDBSpinningPreloader, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
