import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { OrderService } from '../../../../core/services/order.service';
import { ToastService } from '../../../../core/services/toast.service';
import { OrderResponse, OrderStatus } from '../../../../core/models';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DatePipe, SpinnerComponent, PaginatorComponent],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent {
  private readonly orderService = inject(OrderService);
  private readonly toast = inject(ToastService);

  readonly orders = signal<OrderResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);
  readonly updatingId = signal<string | null>(null);

  readonly statusLabels: Record<OrderStatus, string> = {
    PENDING: 'Pendiente',
    PAID: 'Pagado',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
  };

  readonly statusColors: Record<OrderStatus, string> = {
    PENDING: 'text-amber-600 bg-amber-50',
    PAID: 'text-green-600 bg-green-50',
    SHIPPED: 'text-blue-600 bg-blue-50',
    DELIVERED: 'text-gray-600 bg-gray-100',
    CANCELLED: 'text-red-600 bg-red-50',
  };

  readonly allowedNextStatuses: Record<OrderStatus, OrderStatus[]> = {
    PENDING: ['PAID', 'CANCELLED'],
    PAID: ['SHIPPED', 'CANCELLED'],
    SHIPPED: ['DELIVERED', 'CANCELLED'],
    DELIVERED: [],
    CANCELLED: [],
  };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.orderService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.orders.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('No se pudieron cargar las órdenes', 'error');
      },
    });
  }

  changeStatus(order: OrderResponse, newStatus: OrderStatus) {
    if (!confirm(`¿Cambiar orden ${order.orderNumber} a "${this.statusLabels[newStatus]}"?`))
      return;
    this.updatingId.set(order.id);
    this.orderService.updateStatus(order.id, { status: newStatus }).subscribe({
      next: () => {
        this.toast.show(`Orden ${order.orderNumber} actualizada a ${this.statusLabels[newStatus]}`);
        this.load();
      },
      error: () => {
        this.updatingId.set(null);
        this.toast.show('No se pudo actualizar la orden', 'error');
      },
    });
  }

  prev() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.load();
    }
  }

  next() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update((p) => p + 1);
      this.load();
    }
  }
}
