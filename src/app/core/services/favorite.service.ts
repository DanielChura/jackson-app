import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FavoriteResponse, CreateFavoriteRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/favorites`;

  getByUser(userId: string) {
    return this.http.get<FavoriteResponse[]>(`${this.apiUrl}/user/${userId}`);
  }

  add(payload: CreateFavoriteRequest) {
    return this.http.post<FavoriteResponse>(this.apiUrl, payload);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
