import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./category-list/category-list.component').then((c) => c.CategoryListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./category-form/category-form.component').then((c) => c.CategoryFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./category-form/category-form.component').then((c) => c.CategoryFormComponent),
  },
] as Routes;
