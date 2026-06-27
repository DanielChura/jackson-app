import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { UserService } from '../../core/services/user.service';
import { OrderResponse } from '../../core/models/order.models';
import { UserResponse } from '../../core/models/user.models';
import { DASHBOARD_ORDER_STATUS_MAP } from '../../core/models';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'account.component.html',
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  orderService = inject(OrderService);
  userService = inject(UserService);
  DASHBOARD_ORDER_STATUS_MAP = DASHBOARD_ORDER_STATUS_MAP;

  getOrderStatusInfo(status: any) {
    return this.DASHBOARD_ORDER_STATUS_MAP[status as keyof typeof DASHBOARD_ORDER_STATUS_MAP];
  }

  orders = signal<OrderResponse[]>([]);
  user = signal<UserResponse | null>(null);

  ngOnInit() {
    this.userService.getMe().subscribe((user) => this.user.set(user));
    this.orderService.getMyOrders().subscribe((res) => {
      this.orders.set(res.content);
    });
  }
}
