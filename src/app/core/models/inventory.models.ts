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
