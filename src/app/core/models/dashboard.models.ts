import type { OrderStatus } from './order.models';

export type Granularity = 'day' | 'week' | 'month';

export interface DateRange {
  desde: string;
  hasta: string;
}

export interface DashboardSummary {
  totalSales: number;
  totalOrders: number;
  averageTicket: number;
  totalCustomers: number;
  lowStockProducts: number;
}

export interface SalesByPeriodEntry {
  period: string;
  totalSales: number;
  orderCount: number;
}

export interface TopProductEntry {
  productId: string;
  productName: string;
  unitsSold: number;
  revenue: number;
}

export interface OrdersByStatusEntry {
  status: OrderStatus;
  count: number;
}

export interface RecentOrderEntry {
  orderId: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  orderedAt: string;
}

interface DashboardOrderStatusInfo {
  label: string;
  color: string;
}

export const DASHBOARD_ORDER_STATUS_MAP: Record<OrderStatus, DashboardOrderStatusInfo> = {
  PENDING: { label: 'Pendiente', color: 'text-amber-600 bg-amber-50' },
  PAID: { label: 'Pagado', color: 'text-blue-600 bg-blue-50' },
  SHIPPED: { label: 'Enviado', color: 'text-purple-600 bg-purple-50' },
  DELIVERED: { label: 'Entregado', color: 'text-green-600 bg-green-50' },
  CANCELLED: { label: 'Cancelado', color: 'text-red-600 bg-red-50' },
};
