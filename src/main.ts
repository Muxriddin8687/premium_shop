import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { HttpClientModule } from '@angular/common/http';

const maskConfig = {
  validation: true,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules)
    ),
    importProvidersFrom(BrowserModule, HttpClientModule),
    provideEnvironmentNgxMask(maskConfig)
  ]
})
  .catch(err => console.error(err));
