import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { routes } from './app.routes';
import { TokenInterceptorInterceptor } from '@core/interceptors/token-interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppInitService } from '@core/init/app-init.service';

export function initializeApp(appService: AppInitService) {
  return (): Promise<any> => {
    return appService.initializeApp();
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp, 
      multi: true,
      deps: [AppInitService]
    },
    provideHttpClient(
      withInterceptors(
        [
          TokenInterceptorInterceptor
        ]
      )
    ),
  ]
};
