import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);

        // Redirect based on account type
        switch (response.account_type) {
          case 'admin':
            this.router.navigate(['/admin-home']);
            break;
          case 'artist':
            this.router.navigate(['/artist-home']);
            break;
          case 'listener':
            this.router.navigate(['/listener-home']);
            break;
          default:
            alert('Unknown account type');
        }
      },
      (error) => {
        alert('Login failed: ' + error.error.message);
      }
    );
  }
}
