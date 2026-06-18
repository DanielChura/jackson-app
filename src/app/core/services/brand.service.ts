import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BrandResponse, CreateBrandRequest, PagedResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/brands`;

  getAll(page = 0, size = 20) {
    return this.http.get<PagedResponse<BrandResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: string) {
    return this.http.get<BrandResponse>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateBrandRequest) {
    return this.http.post<BrandResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: CreateBrandRequest) {
    return this.http.put<BrandResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
