// ──────────────────────────────────────────────
// Jackson API — Modelos/Interfaces TypeScript
// Fuente de verdad única. Sincronizado con OpenAPI.
// ──────────────────────────────────────────────

// ─── Genéricos ────────────────────────────────

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}

// ─── Auth ─────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
}

export type DecodedJwt = Pick<AuthResponse, 'email' | 'role'> & { exp?: number };

// ─── Users ────────────────────────────────────

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  email: string;
  phone?: string;
  address?: string;
  roleName: string;
}

// ─── Roles ────────────────────────────────────

export interface CreateRoleRequest {
  name: string;
  description?: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

// ─── Categories ───────────────────────────────

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

// ─── Brands ───────────────────────────────────

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

// ─── Products ─────────────────────────────────

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
  specifications?: Record<string, unknown>;
}

// ─── Product Images ───────────────────────────

export interface ProductImageResponse {
  id: string;
  productId: string;
  url: string;
  displayOrder: number;
}

// ─── Reviews ──────────────────────────────────

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

// ─── Cart ─────────────────────────────────────

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

// ─── Orders ───────────────────────────────────

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

// ─── Payments ─────────────────────────────────

export type PaymentMethod =
  | 'PAYPAL' | 'STRIPE' | 'CASH' | 'YAPE'
  | 'PLIN' | 'BANK_TRANSFER' | 'DEBIT_CARD' | 'CREDIT_CARD';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface CreatePaymentRequest {
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  transactionId: string;
}

export interface UpdatePaymentStatusRequest {
  status: PaymentStatus;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
}

// ─── Inventory ────────────────────────────────

export type MovementType = 'IN' | 'OUT' | 'SALE' | 'RETURN' | 'ADJUSTMENT';

export interface CreateInventoryRequest {
  productId: string;
  movementType: MovementType;
  quantity: number;
  reason: string;
}

export interface InventoryResponse {
  id: string;
  productId: string;
  movementType: MovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  createdAt: string;
}

// ─── Favorites ────────────────────────────────

export interface CreateFavoriteRequest {
  productId: string;
}

export interface FavoriteResponse {
  id: string;
  userId: string;
  productId: string;
}
