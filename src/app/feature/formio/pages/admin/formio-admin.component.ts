import { Formio } from 'formiojs';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormioService } from '@core/services/formio.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormioComponent, FormioJSON } from '@core/interfaces/formio-json.interface';
import { FormcontrolEventListener } from '@core/interfaces/formcontrol-event-pair.interface';

@Component({
  selector: 'app-formio-admin',
  templateUrl: './formio-admin.component.html',
  styleUrls: ['./formio-admin.component.scss']
})
export class FormioAdminComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  public dataSource!: MatTableDataSource<any>;
  public title: string = 'Administrador de Formularios';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayColumns = ['nom_form', 'cod_form'];

  constructor(
    private formioSvc: FormioService
  ) { }

  ngOnInit(): void {
    this.setDatasource();
  }

  private setDatasource(): void {
    this.subs.add(this.formioSvc.read()
      .subscribe({
        next: data => {
          console.log(data)
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },
        error: err => {
          console.log('Error:', err)
        },
        complete: () => console.log('Complete read forms')
      })
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}