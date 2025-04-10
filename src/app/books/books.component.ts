import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageResponse } from '../models/PageResponse';
import { BookDetailResponse } from '../models/BookDetailResponse';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: PageResponse<BookDetailResponse> = {
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalElements: 0,
    data: []
  };
  loading: boolean = false;
  searchTerm: string = '';
  pages: number[] = []; // Danh sách số trang

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(page: number = 1, search?: string): void {
    this.loading = true;
    this.bookService.getBooks(page, search).subscribe({
      next: (response) => {
        this.books = response;
        this.pages = Array.from({ length: this.books.totalPages }, (_, i) => i + 1);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    this.fetchBooks(1, this.searchTerm);
  }

  onPreviousPage(): void {
    if (this.books.currentPage > 1) {
      this.fetchBooks(this.books.currentPage - 1, this.searchTerm);
    }
  }

  onNextPage(): void {
    if (this.books.currentPage < this.books.totalPages) {
      this.fetchBooks(this.books.currentPage + 1, this.searchTerm);
    }
  }

  viewBookDetail(id: string): void {
    this.router.navigate([`/book-detail/${id}`]);
  }
}