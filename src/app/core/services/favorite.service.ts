import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FavoriteResponse, CreateFavoriteRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/favorites`;

  /** Obtiene los favoritos del usuario autenticado (userId se extrae del JWT en backend). */
  getMine() {
    return this.http.get<FavoriteResponse[]>(`${this.apiUrl}/mine`);
  }

  add(payload: CreateFavoriteRequest) {
    return this.http.post<FavoriteResponse>(this.apiUrl, payload);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
