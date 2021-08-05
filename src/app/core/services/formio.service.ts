import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class FormioService {

    private readonly timeToResponse = 1000;

    private data = {
      title: "Formio Form",
      components: [
        {
          id: "ID",
          type: 'textfield',
          key: 'nombre',
          label: 'Nombre',
          placeholder: 'Digita tu nombre',
          input: true,
          validationRules: [
              { "required": true },
              { "minlength": 2 },
              { "maxlength": 10 }
          ]
        },
        {
          id: "ID",
          type: 'textfield',
          key: 'apellido',
          label: 'Apellidos',
          placeholder: 'Digita tu apellido',
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

    validationMessages = {
      'nombre': {
        'required': 'Nombre is requerido',
        'minlength': 'Nombre debe tener mínimo 2 caracteres',
        'maxlength': 'Nombre debe tener máximo 10 caracteres'
      },
      'apellido': {
        'required': 'Apellido es requerido'
      },
      'email': {
        'required': 'Email es requerido'
      }
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