import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit{
  users: any[] = [];
  selectedUserForDetail: any = null;
  selectedUserForEdit: any = null;
  selectedUserForDelete: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        alert('Failed to fetch users: ' + error.message);
      }
    );
  }

  openDetailPopup(user: any): void {
    this.selectedUserForDetail = { ...user };
  }

  closeDetailPopup(): void {
    this.selectedUserForDetail = null;
  }
  navigateToCreateUser(): void {
  this.router.navigate(['/createuser']);
  }
  openEditPopup(user: any): void {
    this.selectedUserForEdit = { ...user }; // Copy user data to prevent direct modification
  }

  closeEditPopup(): void {
    this.selectedUserForEdit = null;
  }

  onEditSubmit(): void {
    this.authService.updateUser(this.selectedUserForEdit).subscribe(
      () => {
        alert('User updated successfully');
        this.closeEditPopup();
        this.loadUsers();
      },
      (error) => {
        alert('Failed to update user: ' + error.message);
      }
    );
  }

  openDeletePopup(user: any): void {
    this.selectedUserForDelete = user;
  }

  closeDeletePopup(): void {
    this.selectedUserForDelete = null;
  }

  onDeleteUser(): void {
    if (this.selectedUserForDelete) {
      this.authService.deleteUser(this.selectedUserForDelete.userID).subscribe(
        () => {
          alert('User deleted successfully');
          this.closeDeletePopup();
          this.loadUsers();
        },
        (error) => {
          alert('Failed to delete user: ' + error.message);
        }
      );
    }
  }
}