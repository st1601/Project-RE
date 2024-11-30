import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:5000/api/artists'; // Đường dẫn API

  constructor(private http: HttpClient) {}

  // Lấy danh sách nghệ sĩ
  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
