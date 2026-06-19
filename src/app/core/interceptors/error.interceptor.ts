import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const body = err.error ?? {};
      errorService.show({
        status: err.status,
        error: body.error || 'Error inesperado',
        message: body.message || err.message,
        timestamp: body.timestamp || new Date().toISOString(),
      });
      return throwError(() => err);
    }),
  );
};
