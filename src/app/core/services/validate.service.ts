import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { ApiFormioService } from './api-formio.service';
import { ValidationRulesService } from './validation-rules.service';


@Injectable()
export class ValidateService {

  constructor(
    private apiFormioSvc: ApiFormioService,
    private validationRulesSvc: ValidationRulesService
  ) {}

  formListenersInit(formControls: any[], formConfig: any): Observable<unknown> {
    const eventListeners = formConfig.eventListeners;
    const observables$ = eventListeners.map((event: string) => fromEvent(formControls, event));
    const listeners = merge(...observables$)
      .pipe(
        tap((event: any) => {
          const formControl = event.target;
          this.getEventListenersByFormControl(formControl, formConfig);
          const formControlEventListeners = this.getEventListenersByFormControl(formControl, formConfig);
          if (formControlEventListeners) {
            const callBack = formControlEventListeners.callBack.service.serviceName;
            const method = eval(`this.apiFormioSvc.${callBack}()`);
          } else {
            console.log('Eventos que tiene este formControl: NINGUNO');
          }
        })
      )
    return listeners;
  }

  private getEventListenersByFormControl(formControl: HTMLInputElement, formConfig: any) {
    const formControlName = formControl.id.substring(3);
    const formioComponents = formConfig.components;
    const formioComponent = formioComponents.find((component: any) => component.key === formControlName);    
    const eventListeners = formioComponent.eventListeners;
    return eventListeners ? eventListeners : null;
  }

}