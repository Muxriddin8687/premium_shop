import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideEnvironmentNgxMask } from 'ngx-mask';

const maskConfig = {
  validation: true,
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideEnvironmentNgxMask(maskConfig)
  ]
})
  .catch(err => console.error(err));
