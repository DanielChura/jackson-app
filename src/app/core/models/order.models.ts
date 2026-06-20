export interface CreateOrderRequest {
  shippingAddress: string;
  shippingReference?: string;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export interface CreateOrderDetailRequest {
  productId: string;
  quantity: number;
}

export interface OrderDetailResponse {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderResponse {
  id: string;
  userId: string;
  orderNumber: string;
  subtotal: number;
  taxes: number;
  total: number;
  shippingAddress: string;
  shippingReference?: string;
  status: OrderStatus;
  orderedAt: string;
  items: OrderDetailResponse[];
}
