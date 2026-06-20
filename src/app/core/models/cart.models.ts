export interface CreateCartItemRequest {
  cartId: string;
  productId: string;
  quantity: number;
}

export interface CartItemResponse {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartResponse {
  id: string;
  userId: string;
  total: number;
  items: CartItemResponse[];
}
