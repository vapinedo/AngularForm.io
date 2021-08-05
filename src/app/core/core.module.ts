import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormioService } from './services/formio.service';
import { ValidateService } from './services/validate.service';
import { ValidationRulesService } from './services/validation-rules.service';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    FormioService,
    ValidateService,
    ValidationRulesService
  ]
})
export class CoreModule { }
