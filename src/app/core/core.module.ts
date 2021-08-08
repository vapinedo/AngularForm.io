import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormioService } from './services/formio.service';
import { ValidateService } from './services/validate.service';
import { ApiFormioService } from './services/api-formio.service';
import { ValidationRulesService } from './services/validation-rules.service';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    FormioService,
    ValidateService,
    ApiFormioService,
    ValidationRulesService
  ]
})
export class CoreModule { }
