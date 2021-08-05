import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { ValidationRulesService } from './validation-rules.service';
import { ValidationMessage } from '@core/interfaces/validation-message.interface';
import { ValidationRule } from '@core/interfaces/validation-rule.interface';


@Injectable()
export class ValidateService {

  private validationMessages: ValidationMessage = {};

  constructor(
    private validationRulesSvc: ValidationRulesService
  ) {}

  formListenersInit(formControls: any[]): Observable<unknown> {
    const blur$ = fromEvent(formControls, 'blur');
    const keyup$ = fromEvent(formControls, 'keyup');
    const listeners = merge(blur$, keyup$);
    return listeners;
  }

  validationMessagesInit(formControls: any[]) {
    const formControlNames = formControls.map((control: any) => control.id.substring(3));
    for(let control of formControlNames) {
      this.validationMessages[control] = [];
    }
  }

  validateFormControl(formControl: HTMLInputElement, validationRules: ValidationRule[]) {
    if (validationRules.length === 0) return;

    const formControlName = formControl.id.substring(3);

    for (let i=0; i<validationRules.length; i++) {
      const rule = validationRules[i];

      if ('required' in rule && rule.required) {
        const message = this.validationRulesSvc.required(formControl);
        this.validationMessages[formControlName] = [];

        if (message) {
          this.validationMessages[formControlName].push(message);
        } else {
          this.validationMessages[formControlName] = [];
        }
        console.log(this.validationMessages); 
        // break;
      }

      if ('minlength' in rule) {
        console.log('minlength')
        const message = this.validationRulesSvc.minlength(formControl, rule.minlength!);
        this.validationMessages[formControlName] = [];

        if (message) {
          this.validationMessages[formControlName].push(message);
        } else {
          this.validationMessages[formControlName] = [];
        }
        console.log(this.validationMessages); 
        // break;
      }
    }

    // const value = '0';
    // console.log(this.validationRulesSvc.required(value));
    
    // const newMessage = this.validationRules(formControlName, formControlValue, formControlValidationRules);
  
    // console.log(newMessage)
    
    // if (this.validationMessages.length === 0) {
    //   this.validationMessages.push(newMessage);
    // } else {
    //   for (let i=0; i<this.validationMessages.length; i++) {
    //     const message = this.validationMessages[i];

    //     if (message[formControlName]) {
    //       console.log('ENCONTRADO')
    //     } else {
    //       console.log('NO ENCONTRADO')
    //       this.validationMessages.push(newMessage)
    //     }
    //   }
    // }
    // console.log('VALIDATION MESSAGES: ', this.validationMessages)
  }

  // validationRules(formControlName: string, formControlValue: any, formControlValidationRules: any) {
  //   let message = {};

  //   formControlValidationRules.forEach((rule: any) => {
  //     if (rule.required && rule.required === true ) {
  //       message = {[formControlName]: [`${formControlName} es requerido`]};
  //     } 
  //   });
  //   return message;
  // }

}