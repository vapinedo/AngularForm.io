import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FormioRoutingModule } from './formio-routing.module';

import { FormioAdminComponent } from './pages/admin/formio-admin.component';
import { FormioDetailComponent } from './pages/detail/formio-detail.component';


const modules = [
  CommonModule, 
  SharedModule,
  FormioRoutingModule
];

const components = [
  FormioAdminComponent,
  FormioDetailComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class FormioModule { }
