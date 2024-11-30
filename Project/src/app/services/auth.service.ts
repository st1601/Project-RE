import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:5000/api/auths';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}
  // auth
  login(email: string, password: string) {
    return this.http.post(`${this.apiURL}/login`, { email, password });
  }
  // auth
  resetPassword(email: string, password: string) {
    return this.http.post(`${this.apiURL}/reset`, { email, password });
  } 
// auth
  setAuthStatus(status: boolean) {
    this.authStatus.next(status);
  }
// auth
  getAuthStatus() {
    return this.authStatus.asObservable();
  }
  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage
    localStorage.removeItem('currentUserID');
    localStorage.removeItem('currentUserToken');

    // Chuyển hướng về trang login sau khi logout
    this.router.navigate(['/login']);
  }
  getCurrentUserID(): string | null {
    return localStorage.getItem('currentUserID');
  }
  getCurrentUserType(): string | null {
    return localStorage.getItem('currentUserType'); // Giả sử loại tài khoản được lưu trong localStorage
  }
  getUserID(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userID; // Giải mã token để lấy userID
    }
    return null;
  }
}