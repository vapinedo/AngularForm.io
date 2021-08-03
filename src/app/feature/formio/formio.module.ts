import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FormioRoutingModule } from './formio-routing.module';

import { FormJsonComponent } from './pages/form-json/form-json.component';
import { FormEmbedUrlComponent } from './pages/form-embed-url/form-embed-url.component';


const modules = [
  CommonModule, 
  SharedModule,
  FormioRoutingModule
];

const components = [
  FormJsonComponent,
  FormEmbedUrlComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class FormioModule { }
