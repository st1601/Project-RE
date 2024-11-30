import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbarlisten',
  templateUrl: './navbarlisten.component.html',
  styleUrls: ['./navbarlisten.component.scss']
})
export class NavbarlistenComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Gọi hàm logout từ AuthService
  }
}
