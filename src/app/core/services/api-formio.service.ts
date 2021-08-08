import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiFormioService {

    private readonly timeToResponse = 1000;

    constructor() {}

    callBack1(param: any[]) {
        // return new Observable(observer => {
        //     setTimeout(() => {
        //         observer.next(param);
        //         observer.complete();
        //     }, this.timeToResponse)
        // })
        console.log('response from api service');
    }
}