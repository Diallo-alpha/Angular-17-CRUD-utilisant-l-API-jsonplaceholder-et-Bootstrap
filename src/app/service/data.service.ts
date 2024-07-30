import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createArticle(articleData: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post(this.apiUrl, articleData);
  }

  updateArticle(id: number, articleData: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, articleData);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
