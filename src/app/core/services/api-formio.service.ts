import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiFormioService {

    private readonly timeToResponse = 1000;

    constructor() {}

    callBack1(param?: any) {
        const response = param ? param : 'Hello from API';
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(response);
                observer.complete();
            }, this.timeToResponse)
        })
        // return response;
    }
}