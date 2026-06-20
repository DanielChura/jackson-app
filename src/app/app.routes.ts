import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then((c) => c.RegisterComponent),
      },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then((c) => c.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'products',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout.component').then((c) => c.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then((c) => c.AdminDashboardComponent),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/admin/products/products.routes'),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./features/admin/brands/brands.routes'),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/admin/categories/categories.routes'),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/admin/orders/orders.routes'),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/admin/users/users.routes'),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/admin/inventory/inventory.routes'),
      },
    ],
  },
];
