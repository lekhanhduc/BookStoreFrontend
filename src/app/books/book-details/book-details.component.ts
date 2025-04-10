import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  bookDetail: any = null; // Khởi tạo với null để tránh undefined

  constructor(
    private bookService: BookService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      const id = Number(param.get('id')); // Lấy ID từ URL
      if (id) {
        this.getBookDetailById(id);
      }
    });
  }

  getBookDetailById(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (response) => {
        this.bookDetail = response.data; // Gán dữ liệu API vào bookDetail
        console.log(this.bookDetail); // Kiểm tra dữ liệu trong console
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
      },
    });
  }
}
