import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './../../services/book.service';
import { ApiResponse } from '../../models/ApiResponse';
import { BookDetailResponse } from '../../models/BookDetailResponse';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  bookDetail: any = null;

  constructor(
    private bookService: BookService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      const id = (param.get('id')); // Lấy ID từ URL
      if (id) {
        this.getBookDetailById(id);
      }
    });
  }

  getBookDetailById(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (response: ApiResponse<BookDetailResponse>) => { 
        if (response && response.code === 200) {
          this.bookDetail = response.data;
        } else {
          console.error('Invalid response from API:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
      },
    });
  }
}