import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateProductRequest, ProductResponse, ProductImageResponse, PagedResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  getAll(page = 0, size = 20) {
    return this.http.get<PagedResponse<ProductResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
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
