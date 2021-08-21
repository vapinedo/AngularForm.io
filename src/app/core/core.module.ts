import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormioService } from './services/formio.service';
import { FakeBackendService } from './services/fake-backend.service';
import { InterceptorService } from './services/interceptor.service';

@NgModule
({
  imports: [
    HttpClientModule
  ],
  providers: [
    FormioService,
    FakeBackendService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService
    }
  ]
})
export class CoreModule { }
