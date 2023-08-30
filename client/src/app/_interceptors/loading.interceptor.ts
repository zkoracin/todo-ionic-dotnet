import { HttpInterceptorFn } from "@angular/common/http";
import { LoadingService } from "../_services/loading.service";
import { inject } from "@angular/core";
import { delay, finalize, identity } from "rxjs";
import { environment } from "src/environments/environment";

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.addLoadingRequest();
  return next(req).pipe(
    (environment.production ? identity : delay(1000)),
    finalize(() => loadingService.removeLoadingRequest())
  );
}