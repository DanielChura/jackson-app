export interface CreateReviewRequest {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

export interface ReviewResponse {
  id: string;
  userId: string;
  productId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
