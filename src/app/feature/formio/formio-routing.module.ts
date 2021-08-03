import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormJsonComponent } from './pages/form-json/form-json.component';
import { FormEmbedUrlComponent } from './pages/form-embed-url/form-embed-url.component';

const routes: Routes = [
  { path: 'form-json', component: FormJsonComponent },
  { path: 'embed-url', component: FormEmbedUrlComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class FormioRoutingModule { }