import type { CategoryResponse } from './category.models';
import type { BrandResponse } from './brand.models';

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  specifications?: Record<string, unknown>;
}

export interface ProductResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryResponse | null;
  brand: BrandResponse | null;
  image?: string;
  specifications?: Record<string, unknown>;
}

export interface ProductImageResponse {
  id: string;
  productId: string;
  url: string;
  displayOrder: number;
}
