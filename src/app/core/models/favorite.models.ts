export interface CreateFavoriteRequest {
  productId: string;
}

export interface FavoriteResponse {
  id: string;
  userId: string;
  productId: string;
}
