import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/v1/books-search-keyword';

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, keyword?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page);

    if (keyword) {
      params = params.set('key', keyword);
    }

    return this.http.get(this.apiUrl, { params });
  }

  getBookById(id: number): Observable<any> {
    const url = `http://localhost:8080/api/v1/books/${id}`;
    return this.http.get(url);
  }

}

