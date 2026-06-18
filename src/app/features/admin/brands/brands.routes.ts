import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./brand-list/brand-list.component').then((c) => c.BrandListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./brand-form/brand-form.component').then((c) => c.BrandFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./brand-form/brand-form.component').then((c) => c.BrandFormComponent),
  },
] as Routes;
