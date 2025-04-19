import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageResponse } from '../models/PageResponse';
import { BookDetailResponse } from '../models/BookDetailResponse';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'Home Page';

  books: PageResponse<BookDetailResponse> = {
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalElements: 0,
    data: []
  }
  loading: boolean = false;
  pages: number[] = [];

  constructor(private translate: TranslateService, 
    private bookService: BookService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(page: number = 1): void {
    this.loading = true;
    this.bookService.getBooks(page).subscribe({
       next: (response) => {
          this.books = response;
          this.pages = Array.from({ length: this.books.totalPages }, (_, i) => i + 1);
          this.loading = false;
       },
       error: (err) => {
          console.log(err);
          this.loading = false
       }
    })
  }

  onPreviousPage(): void {
    if (this.books.currentPage > 1) {
      this.fetchBooks(this.books.currentPage - 1);
    }
  }

  onNextPage(): void {
    if (this.books.currentPage < this.books.totalPages) {
      this.fetchBooks(this.books.currentPage + 1);
    }
  }

  viewBookDetail(id: string): void {
    this.router.navigate([`/book-detail/${id}`]);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  
}
