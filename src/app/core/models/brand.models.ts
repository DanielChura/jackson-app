export interface CreateBrandRequest {
  name: string;
  description?: string;
  logoUrl?: string;
}

export interface BrandResponse {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
}
