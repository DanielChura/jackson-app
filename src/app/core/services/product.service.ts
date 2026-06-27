import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  CreateProductRequest,
  ProductResponse,
  ProductImageResponse,
  PagedResponse,
  TopProductEntry,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  getAll(
    page = 0,
    size = 10,
    sortBy?: string,
    filters?: {
      name?: string;
      category?: string;
      brand?: string;
    },
  ) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (sortBy) {
      // Map legacy sorting formats to the new API specs
      let mappedSort = sortBy;
      if (sortBy === 'price,asc') mappedSort = 'price-asc';
      else if (sortBy === 'price,desc') mappedSort = 'price-desc';
      else if (sortBy === 'createdAt,desc') mappedSort = 'recent';
      else if (sortBy === 'name,asc') mappedSort = 'name';

      params = params.set('sortBy', mappedSort);
    }
    if (filters?.name) params = params.set('name', filters.name);
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.brand) params = params.set('brand', filters.brand);
    return this.http.get<PagedResponse<ProductResponse>>(this.apiUrl, { params });
  }

  getPopular() {
    return this.http.get<TopProductEntry[]>(`${this.apiUrl}/popular`);
  }

  getMostFavorited() {
    return this.http.get<ProductResponse[]>(`${this.apiUrl}/most-favorited`);
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
