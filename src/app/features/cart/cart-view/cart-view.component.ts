import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import type { CartResponse } from '../../../core/models';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './cart-view.component.html',
})
export class CartViewComponent {
  private readonly cartService = inject(CartService);
  private readonly auth = inject(AuthService);

  readonly cart = signal<CartResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    const user = this.auth.currentUser();
    if (!user) {
      this.error.set('Debés iniciar sesión para ver tu carrito');
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

  removeItem(itemId: string) {
    this.cartService.removeItem(itemId).subscribe({
      next: () => {
        const current = this.cart();
        if (!current) return;
        current.items = current.items.filter((i) => i.id !== itemId);
        current.total = current.items.reduce((sum, i) => sum + i.subtotal, 0);
        this.cart.set({ ...current });
      },
    });
  }

  updateQuantity(itemId: string, qty: number) {
    if (qty < 1) return;
    this.cartService.updateItemQuantity(itemId, qty).subscribe({
      next: (res) => this.cart.set(res),
    });
  }
}
