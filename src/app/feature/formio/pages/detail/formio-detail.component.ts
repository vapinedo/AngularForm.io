import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Formio } from 'formiojs';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormioService } from '@core/services/formio.service';
import { FakeBackendService } from '@core/services/fake-backend.service';
import { FormioComponent, FormioJSON } from '@core/interfaces/formio-json.interface';
import { FormcontrolEventListener } from '@core/interfaces/formcontrol-event-pair.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formio-detail',
  templateUrl: './formio-detail.component.html',
  styleUrls: ['./formio-detail.component.scss']
})
export class FormioDetailComponent implements OnInit {

  public form: any;
  public title: string = 'Formulario';
  private subscriptions = new SubSink();
  public readonly DOMElementID: string = 'formio-form';
  public readonly formControlClassName: string = '.form-control';

  constructor(
    private renderer2: Renderer2,
    private formioSvc: FormioService,
    private activatedRoute: ActivatedRoute,
  ) {}

  async ngOnInit() {
    const formID = this.activatedRoute.snapshot.params.id;
    const form = await this.formioSvc.readOne(formID);
    const formComponents = form.jsn_cont.components[0].components;

    console.log(form)

    const formRendered = this.renderForm(formComponents, this.DOMElementID);
    
    // const form: FormioJSON = await this.formioSvc.getForm();
    // const formioComponents = form.components;
    
    // const eventListeners = this.getEventListeners(formioComponents);
    // this.initializeEventListeners(eventListeners);

  // getForm(formID: string) {
  //   this.subscriptions.add(
  //     this.formioSvc.readOne(formID)
  //       .subscribe({
  //         next: data => {
  //           console.log(data);
  //           this.form = data;
  //         },
  //         error: err => console.log('Error:', err),
  //         complete: () => console.log('Complete readOneForm')
  //       })
  //   );
  }
  
  async renderForm(formComponents: any, DOMElementID: string): Promise<void> {
    const DOMLocation = document.getElementById(DOMElementID);
    const formRendered = await Formio.createForm(DOMLocation, formComponents);
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