import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = []; // Danh sách số trang

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(page: number = 1, search?: string): void {
    this.loading = true;
    this.bookService.getBooks(page, search).subscribe({
      next: (response) => {
        this.books = response.data.data;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;

        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

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
    if (this.currentPage > 1) {
      this.fetchBooks(this.currentPage - 1, this.searchTerm);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.fetchBooks(this.currentPage + 1, this.searchTerm);
    }
  }

  viewBookDetail(id: number): void {
    this.router.navigate([`/book-detail/${id}`]);
  }
}
