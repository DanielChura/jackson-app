import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/products/new/images/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/products/new/specs/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/products/:id/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/products/:id/edit/images',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/products/:id/edit/specs',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/brands/:id/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/categories/:id/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'products/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: 'favorites',
    renderMode: RenderMode.Client,
  },
  {
    path: 'orders',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
