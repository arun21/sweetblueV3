import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Storage } from '@core/services/storage.service';
import { windowToken, windowProvider } from '@core/factories/window.provider';
import { Logger } from '@core/services/logger.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AlertService } from './services/alert.service';
import { FormHelper } from './services/form-helper.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    Storage,
    AlertService,
    Logger,
    FormHelper,
    { provide: windowToken, useFactory: windowProvider },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
})
export class CoreModule { }
