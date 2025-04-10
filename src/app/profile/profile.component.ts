import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  avatarUrl: string = 'https://i.pinimg.com/236x/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg';
  user = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    hobbies: '',
    age: null,
    gender: '',
    description: '',
    dob: ''
  };

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  selectedFile: File | null = null;

  onSubmit() {
    const formData = new FormData();
    // Append user data
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('hobbies', this.user.hobbies);
    formData.append('age', this.user.age ?? ''); // nếu user.age null hoặc undifiled thì giá trị sau 2 dấu ?? sẽ được gán cho age
    formData.append('gender', this.user.gender);
    formData.append('description', this.user.description);
    formData.append('dob', this.user.dob);

    // Append avatar file if available
    if (this.selectedFile) {
      const blob = new Blob([this.selectedFile], { type: this.selectedFile.type });
      formData.append('avatar', blob, this.selectedFile.name);
    }


    // Now you can send formData to your backend
    console.log('Form Data:', formData);

    // Example of how to send to the backend using HttpClient
    // this.http.post('your-backend-api', formData).subscribe(response => {
    //   console.log('Response:', response);
    // });
  }
}
