import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpRequest,
	HttpHeaders,
	HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    private readonly apiKey = {
        'DW-API-KEY': 'eyJzaXN0ZW1hIjoiS0FDVFVTIiwiZW1wcmVzYSI6OSwiYW1iaWVudGUiOnsic2lzdGVtYSI6IkthY3R1cyIsImlkIjoiREVTQVJST0xMTyIsIm1vdG9yZGIiOiJ0bU1TU1FMIiwic2VydmVyIjoiMTMyLjE0Ny4yLjY1IiwiZGF0YWJhc2UiOiJLQUNUVVNPTkUiLCJwdWVydG8iOjAsInRpcG8iOiJ0YURFU0FSUk9MTE8iLCJhbGlhc3VzdWFyaW8iOiJmb3JtLmlvIiwidXN1YXJpbyI6ImthY19kZXNhIiwicGFzc3dvcmQiOiJkZXNhcnJvbGxvIiwiYWxpYXNjb25leGlvbiI6IkthY3R1czcifX0='
    };

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const headers = new HttpHeaders(this.apiKey);
		const requestClone = req.clone({ headers }); // here, we can also add params
		return next.handle(requestClone);
	}
}