import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FormioRoutingModule } from './formio-routing.module';

import { FormJsonComponent } from './pages/form-json/form-json.component';
import { FormioAdminComponent } from './pages/admin/formio-admin.component';


const modules = [
  CommonModule, 
  SharedModule,
  FormioRoutingModule
];

const components = [
  FormJsonComponent,
  FormioAdminComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class FormioModule { }
