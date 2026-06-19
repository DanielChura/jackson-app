import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResponse, RoleResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/roles`;

  getAll(page = 0, size = 20) {
    return this.http.get<PagedResponse<RoleResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
