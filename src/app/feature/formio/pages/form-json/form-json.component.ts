import { Formio } from 'formiojs';
import { Component, OnInit } from '@angular/core';
import { FormioService } from '@core/services/formio.service';
import { ValidateService } from '@core/services/validate.service';
import { ValidationRule } from '@core/interfaces/validation-rule.interface';

@Component({
  selector: 'app-form-json',
  templateUrl: './form-json.component.html',
  styleUrls: ['./form-json.component.scss']
})
export class FormJsonComponent implements OnInit {

  public classContext = this;
  public hasErrors: boolean = false;
  public readonly formID: string = 'form-json';
  public readonly formControlRef: string = '.form-control';

  constructor(
    private formioSvc: FormioService,
    private validateSvc: ValidateService
  ) {}
  
  ngOnInit(): void {
    this.formioSvc.read()
    .subscribe({
      next: formConfig => {
        this.formInit(formConfig)
      }
    });
  }
    
  async formInit(formConfig: any): Promise<void> {
    const formContainer = document.getElementById(this.formID);
    await Formio.createForm(formContainer, formConfig);

    const formControlsNodeList: NodeList = document.querySelectorAll(`#${this.formID} ${this.formControlRef}`);
    const formControlsList = this.nodeListToFormControlsArray(formControlsNodeList);

    this.validateSvc.formListenersInit(formControlsList, formConfig)
    .subscribe({
      next: (event: any) => {
        let formControl: HTMLInputElement = event.target;
        console.log('Event has been fired');
      }
    })
  }

  private nodeListToFormControlsArray(nodeList: NodeList): HTMLInputElement[] {
    let formControls: HTMLInputElement[] = [];
    nodeList.forEach(node => formControls.push(<HTMLInputElement>node));
    return formControls;
  }

  private getValidationRulesByFormControl(formControl: HTMLInputElement, formConfig: any): ValidationRule[] {
    const formControlName = formControl.id.substring(3);
    const formioComponents = formConfig.components;
    const formioComponent = formioComponents.find((component: any) => component.key === formControlName);    
    const validationRules = formioComponent.validationRules;
    return validationRules;
  }

}