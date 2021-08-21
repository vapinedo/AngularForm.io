import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'formio',
    loadChildren: () => import('@feature/formio/formio.module')
    .then(m => m.FormioModule)
  },
  { path: '', redirectTo: '/formio/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
