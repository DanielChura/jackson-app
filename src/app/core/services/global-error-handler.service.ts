import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly toast = inject(ToastService);

  handleError(error: unknown): void {
    console.error('[GlobalErrorHandler]', error);

    // Evitamos mostrar toasts para errores HTTP (ya los maneja el interceptor)
    if (error instanceof Error && !this.isHttpError(error)) {
      this.toast.show(
        'Ocurrió un error inesperado. Recargá la página e intentá de nuevo.',
        'error',
      );
    }
  }

  private isHttpError(error: Error): boolean {
    return error.message?.includes('Http failure response') ?? false;
  }
}
