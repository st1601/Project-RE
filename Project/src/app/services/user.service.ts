import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Thay URL API tương ứng

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả người dùng
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  createUser(user: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, user);
  }
  updateUser(user: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${user.userID}`, user);
  }
  deleteUser(userID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userID}`);
  }
}
