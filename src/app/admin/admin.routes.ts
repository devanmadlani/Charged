import { Routes } from '@angular/router';
import { UsersPage } from './users/users.page';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];
