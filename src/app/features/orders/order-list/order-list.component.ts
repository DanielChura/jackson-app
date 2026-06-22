import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import type { OrderResponse } from '../../../core/models';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DatePipe, RouterLink, SpinnerComponent, PaginatorComponent],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent {
  private readonly orderService = inject(OrderService);
  private readonly auth = inject(AuthService);

  readonly orders = signal<OrderResponse[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  constructor() {
    const user = this.auth.currentUser();
    if (!user) {
      this.error.set('Debés iniciar sesión para ver tus órdenes');
      this.loading.set(false);
      return;
    }
    this.load();
  }

  private load() {
    const user = this.auth.currentUser();
    if (!user) return;
    this.loading.set(true);
    this.orderService.getByUser(user.email, this.page(), 10).subscribe({
      next: (res) => {
        this.orders.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las órdenes');
        this.loading.set(false);
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
