import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  onLogin(): void {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          this.authService.saveTokens(accessToken, refreshToken);
          this.authService.setLoggedIn(true);
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastr.error('Invalid username or password!', 'Login Failed');
        },
      });
  }

}
