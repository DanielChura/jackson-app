import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { AuthService } from '../../core/services/auth.service';
import type { CartResponse } from '../../core/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly auth = inject(AuthService);

  readonly cart = signal<CartResponse | null>(null);
  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);

  shippingAddress = '';

  constructor() {
    const user = this.auth.currentUser();
    if (!user) {
      this.error.set('Debés iniciar sesión para comprar');
      this.loading.set(false);
      return;
    }
    this.cartService.getMine().subscribe({
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
        this.checkoutService.createSession(order.id).subscribe({
          next: (session) => {
            window.location.href = session.checkoutUrl;
          },
          error: () => {
            this.error.set('Error al crear la sesión de pago');
            this.submitting.set(false);
          },
        });
      },
      error: () => {
        this.error.set('Error al crear la orden');
        this.submitting.set(false);
      },
    });
  }
}
