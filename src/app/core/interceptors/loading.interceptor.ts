import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import Swal from 'sweetalert2';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  if (activeRequests === 0) {
    loadingService.setLoading(true);
  }
  activeRequests++;

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
      return throwError(() => error);
    }),
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        loadingService.setLoading(false);
      }
    })
  );
};
