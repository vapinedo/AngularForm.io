import { SubSink } from 'subsink';
import { Formio } from 'formiojs';
import { Component, OnInit } from '@angular/core';
import { FormioService } from '@core/services/formio.service';
import { ValidationRule } from '@core/interfaces/validation-rule.interface';

@Component({
  selector: 'app-form-json',
  templateUrl: './form-json.component.html',
  styleUrls: ['./form-json.component.scss']
})
export class FormJsonComponent implements OnInit {

  private subscriptions = new SubSink();
  public readonly formID: string = 'form-json';
  public readonly formControlRef: string = '.form-control';

  constructor(
    private formioSvc: FormioService
  ) {}
  
  async ngOnInit() {
    const formConfig = await this.formioSvc.read();
    const form = this.createForm(formConfig, this.formID);
    const formControls = this.getFormControls(this.formID, this.formControlRef);
    this.setEventListenersToForm(formControls, formConfig);
  }
    
  async createForm(formConfig: any, formID: string): Promise<void> {
    const formContainer = document.getElementById(formID);
    const form = await Formio.createForm(formContainer, formConfig);
    return form;
  }
  
  getFormControls(formID: string, formControlClassName: string): HTMLInputElement[] {
    let formControls: HTMLInputElement[] = [];
    const nodeList: NodeList = document.querySelectorAll(`#${formID} ${formControlClassName}`);
    nodeList.forEach(node => formControls.push(<HTMLInputElement>node));
    return formControls;
  }

  setEventListenersToForm(formControls: HTMLInputElement[], formConfig: any) {
    this.formioSvc.setEvenListeners(formControls, formConfig)
    .subscribe({
      next: (event: any) => {
        let formControl: HTMLInputElement = event.target;
        console.log('Value: ', formControl.value);
      }
    })
  }

  // getValidationRulesByFormControl(formControl: HTMLInputElement, formConfig: any): ValidationRule[] {
  //   const formControlName = formControl.id.substring(3);
  //   const formioComponents = formConfig.components;
  //   const formioComponent = formioComponents.find((component: any) => component.key === formControlName);    
  //   const validationRules = formioComponent.validationRules;
  //   return validationRules;
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}