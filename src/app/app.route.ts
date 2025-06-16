import { Routes } from '@angular/router';

export const route: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome-page/welcome-page.component').then(
        (m) => m.WelcomePageComponent
      ),
  },
  {
    path: 'user/:name',
    loadComponent: () =>
      import('./user-name/user-name.component').then(
        (m) => m.UserNameComponent
      ),
  },
];
