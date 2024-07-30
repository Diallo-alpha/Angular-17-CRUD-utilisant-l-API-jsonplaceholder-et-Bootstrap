import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';// Importation pour les observables

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {} // Injection du HttpClient

  // Méthode pour obtenir tous les articles
  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Méthode pour obtenir un article par son ID
  getArticle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
 
  // Méthode pour créer un nouvel article
  createArticle(articleData: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post(this.apiUrl, articleData);
  }

  // Méthode pour mettre à jour un article existant
  updateArticle(id: number, articleData: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, articleData);
  }

  // Méthode pour supprimer un article
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
