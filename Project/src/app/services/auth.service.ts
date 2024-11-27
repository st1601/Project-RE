import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:5000/api/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}`);
  }
  createUser(user: any): Observable<void> {
    return this.http.post<void>(`${this.apiURL}`, user);
  }

  updateUser(user: any): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${user.userID}`, user);
  }
  
  deleteUser(userID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${userID}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiURL}/login`, { email, password });
  }

  resetPassword(email: string, password: string) {
    return this.http.post(`${this.apiURL}/reset`, { email, password });
  } 

  setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }
}