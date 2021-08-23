import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FakeBackendService } from './fake-backend.service';
import { apiURLS, apiEndPoints } from '@environments/environment';
import { FormioJSON } from '@core/interfaces/formio-json.interface';

@Injectable()
export class FormioService {

  private readonly url = apiURLS.formio;
  private readonly endoPoint = apiEndPoints.formio;

  constructor(
    private http: HttpClient,
    private fakeBackendSvc: FakeBackendService
  ) {}

  getForm(): Promise<FormioJSON> {
    return this.fakeBackendSvc.getForm();
  }

  read() {  
    return this.http.get<any>(`${this.url}/${this.endoPoint}`)
    .pipe(pluck('data', 'forms'));
  }

  readOne(id: string) {  
    return this.http.get<any>(`${this.url}/${this.endoPoint}/${id}`)
    .pipe(pluck('data'))
    .toPromise();
  }

}