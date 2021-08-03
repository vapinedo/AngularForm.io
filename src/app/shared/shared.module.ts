import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule
];


@NgModule({
  // declarations: [components],
  imports: [modules],
  // exports: [components, modules]
  exports: [modules]
})
export class SharedModule { }