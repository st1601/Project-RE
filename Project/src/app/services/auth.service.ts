import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  userID: number;
  user_name: string;
  account_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Thay bằng API của bạn
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).subscribe(
      user => {
        this.currentUser = user;
        this.redirectUser();
      },
      error => {
        console.error('Lỗi đăng nhập:', error);
      }
    );
  }

  redirectUser() {
    if (this.currentUser) {
      switch (this.currentUser.account_type) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'artist':
          this.router.navigate(['/artist']);
          break;
        case 'listener':
          this.router.navigate(['listener']);
          break;
        default:
          break;
      }
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}