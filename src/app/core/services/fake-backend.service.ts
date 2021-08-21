import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormioJSON } from '@core/interfaces/formio-json.interface';

@Injectable()
export class FakeBackendService { 

    private readonly timeToResponse = 1000;

    private form: FormioJSON = {
        title: "Example Formio Form",
        components: [
        {
            id: "ID",
            key: 'pais',
            label: 'País',
            type: 'textfield',
            input: true,
            placeholder: 'Digita país',
            eventListener: {
              event: 'blur',
              action: {
                method: 'onCalcFields',
                serviceURL: 'nombreDelServicio'
              }
            }
        },
        {
            id: "ID",
            input: true,
            key: 'moneda',
            label: 'Moneda',
            type: 'textfield',
            placeholder: 'Digita tu moneda',
            eventListener: {
                event: 'click',
                action: {
                  method: 'anotherBackendMethod',
                  serviceURL: 'nombreDelServicio'
                }
              }
        },
        {
            id: "ID",
            type: 'email',
            input: true,
            key: 'email',
            label: 'Email',
            placeholder: 'Digita tu email',
        },
        {
            type: 'button',
            label: 'Enviar',
            action: 'submit',
            theme: 'primary'
        }]
    };

    constructor() {}

    getForm(): Promise<FormioJSON>  {
        return new Observable<FormioJSON>(observer => {
            setTimeout(() => {
                observer.next(this.form);
                observer.complete();
            }, this.timeToResponse)
        })
        .toPromise();
    }

    onCalcFields() {
        let response = "Aqui iria la respuesta del backend";
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(response);
                observer.complete();
            }, this.timeToResponse)
        })
    }

    anotherBackendMethod() {
        let response = "Response from anotherBackendMethod on Backend";
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(response);
                observer.complete();
            }, this.timeToResponse)
        })
    }

}
