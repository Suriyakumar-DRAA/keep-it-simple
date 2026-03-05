import { HttpInterceptorFn, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from '@shared/service/keycloak.service';
import { LoadingService } from '@shared/service/loading.service';
import { DataShareService } from '@shared/service/data-share.service';
import { environment } from '@env/environment';
import { from, switchMap, tap, finalize, catchError, throwError, take } from 'rxjs';

/** Utility: Random String Generator */
function generateRandomString(length: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export const TokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);
  const loadingService = inject(LoadingService);
  const dataSharedService = inject(DataShareService);

  loadingService.requestStarted();

  let currentUrl = req.url;
  const skipAuth = currentUrl.includes('?RemoveAuthToken');

  if (skipAuth) {
    currentUrl = currentUrl.split('?RemoveAuthToken')[0];
  }

  return dataSharedService.selectedBranchData.pipe(
    take(1), // Get the latest value and complete
    switchMap((bKey) => {
      return from(keycloakService.getToken()).pipe(
        switchMap((token) => {

          // 4. Build Headers
          const headersObj: any = {
            'rid': generateRandomString(22),
            'app-key': environment.appKey
          };

          if (!skipAuth && token) {
            headersObj['Authorization'] = `Bearer ${token}`;
          }

          if (bKey) {
            headersObj['b-key'] = bKey;
          }

          // 5. Clone Request
          const clonedReq = req.clone({
            url: currentUrl,
            setHeaders: headersObj
          });

          // 6. Execute Request
          return next(clonedReq).pipe(
            catchError((err: HttpErrorResponse) => {
              return throwError(() => err); // Re-throw for component catching
            }),
            finalize(() => {
              // 7. Stop Loading Spinner (Runs on Success or Error)
              loadingService.requestCompleted();
            })
          );
        })
      );
    })
  );
};
