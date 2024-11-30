import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbarartist',
  templateUrl: './navbarartist.component.html',
  styleUrls: ['./navbarartist.component.scss']
})
export class NavbarartistComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Gọi hàm logout từ AuthService
  }
}
