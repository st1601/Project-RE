import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit{
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get email from query parameter
    this.route.queryParams.subscribe((params) => {
      this.email = params['email']; // Ensure the email is passed in query params
    });
  }

  onReset(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.resetPassword(this.email, this.password).subscribe(
      (response) => {
        alert('Password reset successfully!');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error resetting password: ' + error.error.message);
      }
    );
  }
}
