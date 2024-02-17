import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'generate-link',
        loadComponent: () => import('./pages/generate-link/generate-link.component').then((m) => m.GenerateLinkComponent)
      }
    ]
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];