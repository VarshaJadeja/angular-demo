import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from 'app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi(),),
    provideAnimations(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      
    }),
    
  ],
});
