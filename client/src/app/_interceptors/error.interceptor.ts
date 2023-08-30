import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ErrorService } from '../_services/error.service';
import { catchError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            errorService.handle400();
            break;
          case 404:
            errorService.handle404();
            break;
          case 500:
            errorService.handle500();
            break;
          default:
            errorService.handleDefault();
            break;
        }
      }
      throw error;
    })
  );
}