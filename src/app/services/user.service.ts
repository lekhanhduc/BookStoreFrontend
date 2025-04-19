import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { UserCreationResponse } from '../models/UserCreationResponse';
import { UserProfileResponse } from '../models/UserProfileResponse';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  private urlApiRegister = 'http://localhost:9191/identity/api/v1/users/registration'

  private urlApiGetInfo = 'http://localhost:9191/identity/api/v1/info'

  registerUser(user: UserCreationResponse): Observable<ApiResponse<UserCreationResponse>> {
    return this.http.post<ApiResponse<UserCreationResponse>>(this.urlApiRegister, user);
  }

  getInfoUserLogin(): Observable<ApiResponse<UserProfileResponse>> {
    const token = this.localStorage.getItem('accessToken');
    if (!token) {
      return throwError(() => new Error('Access token không tồn tại. Vui lòng đăng nhập lại.'));
    }
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<ApiResponse<UserProfileResponse>>(this.urlApiGetInfo, { headers });
  }
}
