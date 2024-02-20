import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';

const maskConfig = {
  validation: true,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    importProvidersFrom(BrowserModule),
    provideEnvironmentNgxMask(maskConfig)
  ]
})
  .catch(err => console.error(err));
