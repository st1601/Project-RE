import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:3000/login', { email: this.email, password: this.password }).subscribe(
      response => {
        const token = response.token;
        const accountType = response.accountType;
        localStorage.setItem('token', token);

        // Chuyển hướng theo loại tài khoản
        if (accountType === 'admin') {
          this.router.navigate(['/admin-home']);
        } else if (accountType === 'artist') {
          this.router.navigate(['/artist-home']);
        } else if (accountType === 'listener') {
          this.router.navigate(['/listener-home']);
        }
      },
      error => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}