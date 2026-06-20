import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateProductRequest, ProductResponse, ProductImageResponse, PagedResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  getAll(page = 0, size = 20, filters?: { name?: string; category?: string; brand?: string }) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (filters?.name) params = params.set('name', filters.name);
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.brand) params = params.set('brand', filters.brand);
    return this.http.get<PagedResponse<ProductResponse>>(this.apiUrl, { params });
  }

  getById(id: string) {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateProductRequest) {
    return this.http.post<ProductResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: CreateProductRequest) {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, payload);
  }

  updateSpecifications(id: string, specifications: Record<string, unknown>) {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}/specifications`, specifications);
  }

  uploadImages(productId: string, files: File[]) {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));
    return this.http.post<ProductImageResponse[]>(`${this.apiUrl}/${productId}/images`, fd);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getImages(productId: string) {
    return this.http.get<ProductImageResponse[]>(`${this.apiUrl}/${productId}/images`);
  }

  deleteImage(productId: string, imageId: string) {
    return this.http.delete<void>(`${this.apiUrl}/${productId}/images/${imageId}`);
  }
}
