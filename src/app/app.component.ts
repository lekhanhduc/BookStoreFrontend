import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BannerComponent } from "./layouts/banner/banner.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./layouts/footer/footer.component";
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './layouts/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterOutlet, HeaderComponent,
    BannerComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Learn-Angular';
  hideLayout: boolean = false;
  showBanner: boolean = true; // 2 Biến kiểm soát hiển thị banner

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Lắng nghe sự thay đổi route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Chỉ xử lý khi route thay đổi
      .subscribe(() => {
        const currentRoute = this.route.root.firstChild?.snapshot.data;
        this.showBanner = currentRoute?.['showBanner'] ?? true; // Mặc định là true nếu không có dữ liệu
        this.hideLayout = currentRoute?.['hideLayout'] ?? false;
      });
  }
  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}
