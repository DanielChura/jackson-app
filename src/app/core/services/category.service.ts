import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CategoryResponse, CreateCategoryRequest, PagedResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/categories`;

  getAll(page = 0, size = 20) {
    return this.http.get<PagedResponse<CategoryResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: string) {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateCategoryRequest) {
    return this.http.post<CategoryResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: CreateCategoryRequest) {
    return this.http.put<CategoryResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
