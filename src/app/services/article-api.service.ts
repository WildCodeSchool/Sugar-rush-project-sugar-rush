import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ARTICLE } from '../shared/datas/article';
import { Article } from '../shared/interfaces/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {

  private apiUrl = 'http://json.helaine.eu/api';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    const url = `${this.apiUrl}/articles.php`;
    return this.http.get<Article[]>(url);
  }

  getArticleById(id: number): Observable<Article> {
    const url = `${this.apiUrl}/article/${id}.php`;
    return this.http.get<Article>(url);
  }
}