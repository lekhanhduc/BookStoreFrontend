import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { UserCreationResponse } from '../models/UserCreationResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:9191/identity/api/v1/users/registration'

  registerUser(user: UserCreationResponse): Observable<ApiResponse<UserCreationResponse>> {
    return this.http.post<ApiResponse<UserCreationResponse>>(this.urlApi, user);
  }
}
