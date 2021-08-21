import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FakeBackendService } from './fake-backend.service';
import { apiURLS, apiEndPoints } from '@environments/environment';

@Injectable()
export class FormioService {

  private readonly url = apiURLS.formio;
  private readonly endoPoint = apiEndPoints.formio;

  constructor(
    private http: HttpClient,
    private fakeBackendSvc: FakeBackendService
  ) {}

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