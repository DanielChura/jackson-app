import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from '../../core/services/auth.service';
import type { CartResponse, PaymentMethod } from '../../core/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly paymentService = inject(PaymentService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly cart = signal<CartResponse | null>(null);
  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);
  readonly step = signal<'cart' | 'pay' | 'done'>('cart');
  readonly orderId = signal<string | null>(null);

  shippingAddress = '';
  paymentMethod: PaymentMethod = 'YAPE';

  constructor() {
    const user = this.auth.currentUser();
    if (!user) {
      this.error.set('Debés iniciar sesión para comprar');
      this.loading.set(false);
      return;
    }
    this.cartService.getByUser(user.email).subscribe({
      next: (res) => {
        this.cart.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el carrito');
        this.loading.set(false);
      },
    });
  }

  submitOrder() {
    if (!this.shippingAddress.trim()) return;
    this.submitting.set(true);
    this.error.set(null);

    this.orderService.create({ shippingAddress: this.shippingAddress }).subscribe({
      next: (order) => {
        this.orderId.set(order.id);
        this.addDetails(order.id);
      },
      error: () => {
        this.error.set('Error al crear la orden');
        this.submitting.set(false);
      },
    });
  }

  private addDetails(orderId: string) {
    const items = this.cart()?.items ?? [];
    if (items.length === 0) {
      this.submitting.set(false);
      return;
    }
    let completed = 0;
    items.forEach((item) => {
      this.orderService
        .addDetail(orderId, { productId: item.productId, quantity: item.quantity })
        .subscribe({
          next: () => {
            completed++;
            if (completed === items.length) {
              this.createPayment(orderId);
            }
          },
          error: () => {
            this.error.set('Error al agregar productos a la orden');
            this.submitting.set(false);
          },
        });
    });
  }

  private createPayment(orderId: string) {
    const total = this.cart()?.total ?? 0;
    this.paymentService
      .create({
        orderId,
        paymentMethod: this.paymentMethod,
        amount: total,
        transactionId: `txn-${Date.now()}`,
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.step.set('done');
          this.cartService.clear(orderId).subscribe();
        },
        error: () => {
          this.error.set('Error al procesar el pago');
          this.submitting.set(false);
        },
      });
  }
}
