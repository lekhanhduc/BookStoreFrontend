import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BookDetailResponse } from '../models/BookDetailResponse';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:9191/search/books';

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, keyword?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page);

    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get(this.apiUrl, { params });
  }

  getBookById(id: string): Observable<ApiResponse<BookDetailResponse>> {
    const url = `http://localhost:9191/book/detail/${id}`;
    return this.http.get<ApiResponse<BookDetailResponse>>(url);
  }

}

