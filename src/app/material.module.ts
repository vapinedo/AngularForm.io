import { NgModule } from '@angular/core';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const modules = [
  MatSortModule,
  MatTableModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatAutocompleteModule
];

@NgModule({
  exports: [modules]
})
export class MaterialModule { }