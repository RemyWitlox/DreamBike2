import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (localStorage.getItem('access_token')) {
    //   let at: string = localStorage.getItem('access_token');
    //   let bearer: string = 'Bearer ' + at;
    //   let myheaders = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: bearer,
    //     access_token: at,
    //   });
    //   return next.handle(req.clone({ headers: myheaders }));
    // } else {
    return next.handle(req);
    // }
  }
}
