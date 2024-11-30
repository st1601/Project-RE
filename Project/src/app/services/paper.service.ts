import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  private apiUrl = 'http://localhost:5000/api/papers'; // Đường dẫn đến API backend

  constructor(private http: HttpClient) {}

  getAllPapers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createPaper(paper: any): Observable<any> {
    return this.http.post(this.apiUrl, paper);
  }
  deletePaper(paperID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paperID}`);
  }
}
