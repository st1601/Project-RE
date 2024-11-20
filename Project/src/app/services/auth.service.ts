import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  // Đăng nhập
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Lưu token vào localStorage
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Kiểm tra người dùng đã đăng nhập chưa
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Lấy vai trò người dùng từ token
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}