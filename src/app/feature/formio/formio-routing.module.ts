import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormioAdminComponent } from './pages/admin/formio-admin.component';
import { FormioDetailComponent } from './pages/detail/formio-detail.component';

const routes: Routes = [
  { path: 'admin', component: FormioAdminComponent },
  { path: 'detail/:id', component: FormioDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class FormioRoutingModule { }