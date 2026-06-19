import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./product-list/product-list.component').then((c) => c.ProductListComponent) },
  { path: 'new', loadComponent: () => import('./product-form/product-form.component').then((c) => c.ProductFormComponent) },
  { path: 'new/images/:id', loadComponent: () => import('./image-upload/image-upload.component').then((c) => c.ImageUploadComponent) },
  { path: 'new/specs/:id', loadComponent: () => import('./spec-step/spec-step.component').then((c) => c.SpecStepComponent) },
  { path: ':id/edit', loadComponent: () => import('./product-form/product-form.component').then((c) => c.ProductFormComponent) },
  { path: ':id/edit/images', loadComponent: () => import('./image-upload/image-upload.component').then((c) => c.ImageUploadComponent) },
  { path: ':id/edit/specs', loadComponent: () => import('./spec-step/spec-step.component').then((c) => c.SpecStepComponent) },
] as Routes;
