import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Formio } from 'formiojs';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormioService } from '@core/services/formio.service';
import { FakeBackendService } from '@core/services/fake-backend.service';
import { FormioComponent, FormioJSON } from '@core/interfaces/formio-json.interface';
import { FormcontrolEventListener } from '@core/interfaces/formcontrol-event-pair.interface';

@Component({
  selector: 'app-form-json',
  templateUrl: './form-json.component.html',
  styleUrls: ['./form-json.component.scss']
})
export class FormJsonComponent implements OnInit {

  private form: any;
  private subscriptions = new SubSink();
  public readonly DOMElementID: string = 'form-json';
  public readonly formControlClassName: string = '.form-control';

  constructor(
    private renderer2: Renderer2,
    private formioSvc: FormioService,
    private fakeBackendSvc: FakeBackendService
  ) {}

  async ngOnInit() {
    const form: FormioJSON = await this.formioSvc.getForm();
    const formRendered = this.renderForm(form, this.DOMElementID);
    const formioComponents = form.components;
    
    const eventListeners = this.getEventListeners(formioComponents);
    this.initializeEventListeners(eventListeners);
  }
  
  async renderForm(form: any, DOMElementID: string): Promise<void> {
    const DOMLocation = document.getElementById(DOMElementID);
    const formRendered = await Formio.createForm(DOMLocation, form);
    return formRendered;
  }
  
  getFormControls(DOMElementID: string, formControlClassName: string): HTMLInputElement[] {
    let formControls: HTMLInputElement[] = [];
    const nodeList: NodeList = document.querySelectorAll(`#${DOMElementID} ${formControlClassName}`);
    nodeList.forEach(node => formControls.push(<HTMLInputElement>node));
    return formControls;
  }

  getEventListeners(formioComponents: FormioComponent[]) {
    let eventListeners: FormcontrolEventListener[] = [];

    for (let component of formioComponents) {
      if (component.eventListener) {
        const event = component.eventListener.event;
        const method = component.eventListener.action.method;
        const serviceURL = component.eventListener.action.serviceURL;
        const formControlID = `${component.id}-${component.key}`;
        const formControl = document.getElementById(formControlID);

        if (event && (formControl instanceof HTMLInputElement)) {
          eventListeners.push({ event, method, serviceURL, formControl });
        }
      }
    }
    return eventListeners;
  }

  initializeEventListeners(eventListeners: FormcontrolEventListener[]) {
    for (let item of eventListeners) {
      this.renderer2.listen(item.formControl , item.event, (e) => {
        const method = item.method;
        const message = `Se ha disparado el evento ${item.event} en ${item.formControl.name}`;
        console.log(message);

        this.executeAction(method);
      })
    }
  }

  executeAction(method: string) {
    const callBackResponse = eval(`this.fakeBackendSvc.${method}()`);        

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

  // setEventListenersToForm(formControls: HTMLInputElement[], formioComponents: FormioComponent[]) {
  //   this.formioSvc.setEvenListeners(formControls, formioComponents)
    // .subscribe({
    //   next: (event: any) => {
    //     let formControl: HTMLInputElement = event.target;
    //     console.log('Value: ', formControl.value);
    //   }
    // })
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}