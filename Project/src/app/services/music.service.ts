import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'http://localhost:5000/api/musics'; // Đường dẫn đến API backend

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSongsByArtist(userID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/songs?userID=${userID}`);
  }
  createMusic(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, formData);
  }
}
