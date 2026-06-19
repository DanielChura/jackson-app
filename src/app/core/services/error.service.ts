import { Injectable, signal } from '@angular/core';

export interface AppError {
  status: number;
  error: string;
  message: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly current = signal<AppError | null>(null);

  show(err: AppError) {
    this.current.set(err);
  }

  clear() {
    this.current.set(null);
  }
}
