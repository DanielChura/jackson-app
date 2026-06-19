import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface ToastState {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly current = signal<ToastState | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  show(message: string, type: ToastType = 'success') {
    clearTimeout(this.timer);
    this.current.set({ message, type });
    this.timer = setTimeout(() => this.clear(), 10000);
  }

  clear() {
    this.current.set(null);
  }
}
