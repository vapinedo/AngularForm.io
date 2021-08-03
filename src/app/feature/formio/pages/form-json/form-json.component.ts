import { Formio } from 'formiojs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-json',
  templateUrl: './form-json.component.html',
  styleUrls: ['./form-json.component.scss']
})
export class FormJsonComponent implements OnInit {

  private readonly externalForm = 'https://examples.form.io/example';
  private localForm = {
    components: [
      {
        type: 'textfield',
        key: 'firstName',
        label: 'Nombres',
        placeholder: 'Digita tu nombre',
        input: true,
      },
      {
        type: 'textfield',
        key: 'lastName',
        label: 'Apellidos',
        placeholder: 'Digita tu apellido',
        input: true
      },
      {
        type: 'email',
        key: 'email',
        label: 'Email',
        placeholder: 'Digita tu email',
        input: true
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Enviar',
        theme: 'primary',
        disabled: true
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {
    const DOMElement = document.getElementById('form-json');

    Formio.createForm(DOMElement, this.localForm)
      .then(function(form) {

        const component = form.getComponent('email')
        const firstName = form.getComponent('firstName');

        component.on('blur', (event: any) => {
          console.log('email blur has been fired', event)

          firstName.setValue('Nuevo valor');
        })
        
        form.on('submit', function(submission: any) {
          console.log('Form has been submitted!', submission);
        });

        // form.on('blur', (event: any) => {
        //   console.log('Blur has been fired', event);
        // });

      })
  }

}