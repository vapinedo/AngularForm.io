import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormJsonComponent } from './pages/form-json/form-json.component';
import { FormioAdminComponent } from './pages/admin/formio-admin.component';

const routes: Routes = [
  { path: 'admin', component: FormioAdminComponent },
  { path: 'form-json', component: FormJsonComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class FormioRoutingModule { }