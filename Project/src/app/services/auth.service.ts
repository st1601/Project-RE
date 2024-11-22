import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:5000/api/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseURL}/login`, { email, password });
  }

  setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }
}