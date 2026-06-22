import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor que maneja errores HTTP de forma centralizada:
 * - 401 → logout automático
 * - Network error / 5xx → modal de error
 * - 4xx → solo relanza (los componentes muestran su propio mensaje amigable)
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // 401 — token expirado o inválido: logout + redirige a login
      if (err.status === 401) {
        authService.logout();
        return throwError(() => err);
      }

      // Network error — backend caído
      if (err.status === 0) {
        errorService.show({
          status: 0,
          error: 'Error de conexión',
          message: 'No se pudo conectar con el servidor. Verificá tu conexión e intentá de nuevo.',
          timestamp: new Date().toISOString(),
        });
        return throwError(() => err);
      }

      // 5xx — error interno del servidor
      if (err.status >= 500) {
        errorService.show({
          status: err.status,
          error: 'Error interno',
          message:
            'Ocurrió un error inesperado en el servidor. Esperá unos minutos e intentá de nuevo.',
          timestamp: new Date().toISOString(),
        });
        return throwError(() => err);
      }

      // 4xx — el componente ya muestra su propio mensaje amigable, solo relanzamos
      return throwError(() => err);
    }),
  );
};
