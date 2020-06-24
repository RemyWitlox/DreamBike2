import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceiveUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // For login test:
  url: string = 'http://Localhost:2020/login';

  constructor(private http: HttpClient) {}

  testConnection(): Observable<boolean> {
    return this.http.get<boolean>('http://Localhost:2020/connect');
  }

  authenticate(username: string, password: string): Observable<ReceiveUser> {
    return this.http.get<any>(this.url, {
      params: { username: username, password: password },
    });
  }
}
