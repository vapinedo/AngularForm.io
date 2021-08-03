import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'formio',
    loadChildren: () => import('@feature/formio/formio.module')
    .then(m => m.FormioModule)
  },
  { path: '', redirectTo: '/formio/form-json', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
