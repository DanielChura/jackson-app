import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateUserRequest, PagedResponse, UserResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  getAll(page = 0, size = 10) {
    return this.http.get<PagedResponse<UserResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: string) {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  getMe() {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`);
  }

  update(id: string, payload: CreateUserRequest) {
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
