import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent {
  user: any = {
    user_name: '',
    full_name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    account_type: 'listener',
    bio: '',
    profilePicture: null,
  };

  constructor(private userService: UserService, private router: Router) {}

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe(
      () => {
        alert('User created successfully');
        this.router.navigate(['/users']);
      },
      (error) => {
        alert('Failed to create user: ' + error.message);
      }
    );
  }
}
