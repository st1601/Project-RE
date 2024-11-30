import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl = 'http://localhost:5000/api/favourites';

  constructor(private http: HttpClient) {}

  addFavourite(userID: number, songID: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userID, songID });
  }
  getFavourites(userID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userID}`);
  }
}
