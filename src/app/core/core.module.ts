import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormioService } from './services/formio.service';
import { FakeBackendService } from './services/fake-backend.service';
import { ValidationRulesService } from './services/validation-rules.service';


@NgModule
({
  imports: [
    HttpClientModule
  ],
  providers: [
    FormioService,
    FakeBackendService,
    ValidationRulesService
  ]
})
export class CoreModule { }
