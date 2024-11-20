import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        switch (response.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'artist':
            this.router.navigate(['/artist']);
            break;
          case 'listener':
            this.router.navigate(['/listener']);
            break;
          default:
            this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Email hoặc mật khẩu không đúng!';
      },
    });
  }
}
