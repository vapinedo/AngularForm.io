import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class FormioService {

    private readonly timeToResponse = 1000;

    private data = {
      title: "Formio Form",
      eventListeners: ['click'],
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
          eventListeners: { 
            'callBack': {
              'service': {
                'serviceName': 'callBack1',
                'params': ['Mensaje para mostrar'],
                // 'response': {
                //   'hiddenValues': ['campoAOcultar'],      
                //   'setValues': [
                //     { 'campoASettear': 'valorASettear' }
                //   ]      
                // }
              },
            }
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

    constructor() {}

    read(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.data);
                observer.complete();
            }, this.timeToResponse)
        });
    }

}