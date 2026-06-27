import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { UserService } from '../../core/services/user.service';
import { OrderResponse } from '../../core/models/order.models';
import { UserResponse } from '../../core/models/user.models';
import { DASHBOARD_ORDER_STATUS_MAP } from '../../core/models';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: 'account.component.html',
})
export class AccountComponent {
  authService = inject(AuthService);
  orderService = inject(OrderService);
  userService = inject(UserService);
  DASHBOARD_ORDER_STATUS_MAP = DASHBOARD_ORDER_STATUS_MAP;

  getOrderStatusInfo(status: any) {
    return this.DASHBOARD_ORDER_STATUS_MAP[status as keyof typeof DASHBOARD_ORDER_STATUS_MAP];
  }

  orders = signal<OrderResponse[]>([]);
  user = signal<UserResponse | null>(null);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);
  page = signal<number>(0);

  constructor() {
    this.load();
  }
  load() {
    this.userService.getMe().subscribe((user) => this.user.set(user));
    this.orderService.getMyOrders(this.page(), 5).subscribe((res) => {
      this.orders.set(res.content);
      this.totalPages.set(res.totalPages);
      this.totalElements.set(res.totalElements);
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
