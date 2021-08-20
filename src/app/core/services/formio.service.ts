import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { FakeBackendService } from './fake-backend.service';
import { FormioComponent, FormioJSON } from '@core/interfaces/formio-json.interface';

@Injectable()
export class FormioService {

  constructor(
    private fakeBackendSvc: FakeBackendService
  ) {}

  getForm(): Promise<FormioJSON> {  
    return this.fakeBackendSvc.getForm();
  }

  // setEvenListeners(formControls: HTMLInputElement[], formioComponents: FormioComponent[]) {
    // const eventListeners = formConfig.eventListeners;
    // const observables$ = eventListeners.map((event: string) => fromEvent(formControls, event));
    
    // const listeners = merge(...observables$)
    //   .pipe(
    //     tap((event: any) => {
    //       const formControl: HTMLInputElement = event.target;
    //       const formioComponent = this.getFormioComponent(formControl, formConfig);
    //       const hasCallBack = this.checkForCallBack(formioComponent);

    //       if (hasCallBack) {
    //         this.executeCallBack(formControl, formioComponent);
    //       }
    //     })
    //   )
    // return listeners;
  // }

  // private checkForCallBack(formioComponent: any) {
  //   return (formioComponent.callBack) ? true : false;
  // }

  // private executeCallBack(formControl: HTMLInputElement, formioComponent: any) {
  //   const formControlValue = formControl.value;
  //   const callBackName = formioComponent.callBack.name;
  //   const callBackParamsRaw = formioComponent.callBack.params ? formioComponent.callBack.params[0] : null;
  //   const paramReady = JSON.stringify(callBackParamsRaw);

  //   const callBackResponse = eval(`this.apiFormioSvc.${callBackName}(${paramReady})`);        

  //   if (callBackResponse instanceof Observable) {
  //     callBackResponse.subscribe({
  //       next: data => console.log('Observable:', data)
  //     })

  //   } else if (callBackResponse instanceof Promise) {
  //     callBackResponse
  //     .then(resolve => console.log('Promise:', resolve))

  //   } else {
  //     console.log('CallBack response is not an Observable nor Promise');
  //   }
  // }

  // private getFormioComponent(formControl: HTMLInputElement, formConfig: any): any {
  //   const formControlName = formControl.id.substring(3);
  //   const formioComponents = formConfig.components;
  //   const formioComponent = formioComponents.find((component: any) => component.key === formControlName);    
  //   return formioComponent;
  // }

}