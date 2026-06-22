import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { NoImagePlaceholderComponent } from '../../../shared/components/no-image-placeholder/no-image-placeholder.component';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import type { ProductResponse } from '../../../core/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SpinnerComponent, NoImagePlaceholderComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly location = inject(Location);

  readonly product = signal<ProductResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Producto no encontrado');
      this.loading.set(false);
      return;
    }
    this.productService.getById(id).subscribe({
      next: (res) => {
        this.product.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar producto');
        this.loading.set(false);
      },
    });
  }

  goBack() {
    this.location.back();
  }

  addToCart() {
    const user = this.auth.currentUser();
    if (!user) {
      this.toast.show('Debés iniciar sesión para agregar al carrito', 'error');
      return;
    }
    const p = this.product();
    if (!p || p.stock === 0) return;

    this.cartService.getMine().subscribe({
      next: (cart) => {
        this.cartService.addItem({ cartId: cart.id, productId: p.id, quantity: 1 }).subscribe({
          next: (updated) => {
            this.cartService.count.set(updated.items.length);
            this.toast.show('Producto agregado al carrito', 'success');
          },
          error: () => {
            this.toast.show('Error al agregar al carrito', 'error');
          },
        });
      },
      error: () => {
        this.toast.show('Error al obtener el carrito', 'error');
      },
    });
  }

  toggleFavorite() {
    const user = this.auth.currentUser();
    if (!user) {
      this.toast.show('Debés iniciar sesión para agregar favoritos', 'error');
      return;
    }
    const p = this.product();
    if (!p) return;

    this.favoriteService.add({ productId: p.id }).subscribe({
      next: () => this.toast.show('Agregado a favoritos', 'success'),
      error: () => this.toast.show('El producto ya está en favoritos', 'error'),
    });
  }
}
