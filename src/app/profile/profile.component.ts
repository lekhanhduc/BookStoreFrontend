import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfileResponse } from '../models/UserProfileResponse';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  profileInfo: UserProfileResponse = {
    firstName: '',
    lastName: '',
    userId: NaN,
    avatar: '',
    phoneNumber: '',
  };

  avatarUrl: string = 'https://i.pinimg.com/236x/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg';
  user = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    hobbies: '',
    age: null as number | null,
    gender: '',
    description: '',
    dob: ''
  };

  selectedFile: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser(): void {
    this.loading = true;
    this.userService.getInfoUserLogin().subscribe({
      next: (response) => {
        if (response.code === 200 && response.data) {
          this.profileInfo = response.data;
          this.user.firstName = this.profileInfo.firstName || '';
          this.user.lastName = this.profileInfo.lastName || '';
          this.user.phoneNumber = this.profileInfo.phoneNumber || '';
          this.avatarUrl = this.profileInfo.avatar || this.avatarUrl;

          this.user.hobbies = '';
          this.user.age = null;
          this.user.gender = '';
          this.user.description = '';
          this.user.dob = '';
          this.loading = false;
        }
      },
      error: (err) => {
        console.log('Lỗi khi gọi API:', err);
        this.loading = false;
        this.router.navigate(['/sign-in']);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    // Append user data
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('hobbies', this.user.hobbies);
    // Append avatar file if available
    if (this.selectedFile) {
      const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
      formData.append('avatar', blob, this.selectedFile.name);
    }

    console.log('Form Data:', formData);
  }
}