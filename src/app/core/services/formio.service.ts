import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { ApiFormioService } from './api-formio.service';
import { ValidationRulesService } from './validation-rules.service';


@Injectable()
export class FormioService {

  private readonly timeToResponse = 1000;

  private formConfigCopy = {
    title: "Formio Form",
    eventListeners: ['blur'],
    components: [
      {
        id: "ID",
        type: 'textfield',
        key: 'pais',
        label: 'País',
        placeholder: 'Digita país',
        input: true,
        validationRules: [
          { "required": true },
          { "minlength": 2 },
          { "maxlength": 10 }
        ],
        callBack: { 
          'name': 'callBack1',
          'params': [],
        }
      },
      {
        id: "ID",
        type: 'textfield',
        key: 'moneda',
        label: 'Moneda',
        placeholder: 'Digita tu moneda',
        input: true,
        validationRules: [
          { "required": true }
        ]
      },
      {
        id: "ID",
        type: 'email',
        key: 'email',
        label: 'Email',
        placeholder: 'Digita tu email',
        input: true,
        validationRules: []
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Enviar',
        theme: 'primary'
      }
    ]
  };

  private formConfig = {
    title: "Formio Form",
    eventListeners: ['blur'],
    components: [
      {
        id: "ID",
        type: 'textfield',
        key: 'pais',
        label: 'País',
        placeholder: 'Digita país',
        input: true,
        validationRules: [
          { "required": true },
          { "minlength": 2 },
          { "maxlength": 10 }
        ],
        callBack: { 
          'name': 'callBack1',
          'params': [this.formConfigCopy],
        }
      },
      {
        id: "ID",
        type: 'textfield',
        key: 'moneda',
        label: 'Moneda',
        placeholder: 'Digita tu moneda',
        input: true,
        validationRules: [
          { "required": true }
        ]
      },
      {
        id: "ID",
        type: 'email',
        key: 'email',
        label: 'Email',
        placeholder: 'Digita tu email',
        input: true,
        validationRules: []
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Enviar',
        theme: 'primary'
      }
    ]
  };

  constructor(
    private apiFormioSvc: ApiFormioService,
    private validationRulesSvc: ValidationRulesService
  ) {}

  read(): Promise<unknown>  {
    return new Observable(observer => {
      setTimeout(() => {
          observer.next(this.formConfig);
          observer.complete();
      }, this.timeToResponse)
    })
    .toPromise();
  }

  setEvenListeners(formControls: HTMLInputElement[], formConfig: any): Observable<unknown> {
    const eventListeners = formConfig.eventListeners;
    const observables$ = eventListeners.map((event: string) => fromEvent(formControls, event));
    
    const listeners = merge(...observables$)
      .pipe(
        tap((event: any) => {
          const formControl: HTMLInputElement = event.target;
          const formioComponent = this.getFormioComponent(formControl, formConfig);
          const hasCallBack = this.checkForCallBack(formioComponent);

          if (hasCallBack) {
            this.executeCallBack(formControl, formioComponent);
          }
        })
      )
    return listeners;
  }

  private checkForCallBack(formioComponent: any) {
    return (formioComponent.callBack) ? true : false;
  }

  private executeCallBack(formControl: HTMLInputElement, formioComponent: any) {
    const formControlValue = formControl.value;
    const callBackName = formioComponent.callBack.name;
    const callBackParamsRaw = formioComponent.callBack.params ? formioComponent.callBack.params[0] : null;
    const paramReady = JSON.stringify(callBackParamsRaw);

    const callBackResponse = eval(`this.apiFormioSvc.${callBackName}(${paramReady})`);        

    if (callBackResponse instanceof Observable) {
      callBackResponse.subscribe({
        next: data => console.log('Observable:', data)
      })

    } else if (callBackResponse instanceof Promise) {
      callBackResponse
      .then(resolve => console.log('Promise:', resolve))

    } else {
      console.log('CallBack response is not an Observable nor Promise');
    }
  }

  private getFormioComponent(formControl: HTMLInputElement, formConfig: any): any {
    const formControlName = formControl.id.substring(3);
    const formioComponents = formConfig.components;
    const formioComponent = formioComponents.find((component: any) => component.key === formControlName);    
    return formioComponent;
  }

}