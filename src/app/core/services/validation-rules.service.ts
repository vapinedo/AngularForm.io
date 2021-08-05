import { Injectable } from '@angular/core';


@Injectable()
export class ValidationRulesService {

  constructor() {}

  required(formControl: HTMLInputElement): string | null {
    const formControlValue = formControl.value;
    const formControlName = formControl.id.substring(3);
    const message = `${formControlName} es requerido`;

    return formControlValue ? null : message;
  }

  minlength(formControl: HTMLInputElement, minlength: number): string | null {

    console.log(minlength)

    const formControlValue = formControl.value;
    const formControlName = formControl.id.substring(3);
    const message = `${formControlName} debe tener mínimo ${minlength} caracteres`;

    return (formControlValue.length >= minlength) ? null : message;
  }

}