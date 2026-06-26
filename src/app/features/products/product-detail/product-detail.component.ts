import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { IconComponent } from '../../../shared/icons/icon.component';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import type { ProductResponse } from '../../../core/models';
import { ProductCarouselComponent } from '../../../shared/components/product-carousel/product-carousel.component';
import { ProductInfoComponent } from "./product-info/product-info.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, IconComponent, ProductCarouselComponent, ProductInfoComponent],
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

  /** Active thumbnail index for the gallery */
  readonly activeImageIndex = signal(0);

  /** Quantity selector */
  readonly qty = signal(1);

  /** Related products */
  readonly relatedProducts = signal<ProductResponse[]>([]);
  readonly relatedLoading = signal(true);

  /** Placeholder rows for the specs table (shown before specs data is available) */
  readonly specPlaceholders = Array.from({ length: 6 });

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

    // Load related products (generic bestsellers for now)
    this.productService.getAll(0, 5, 'price,desc').subscribe({
      next: (res) => {
        this.relatedProducts.set(res.content);
        this.relatedLoading.set(false);
      },
      error: () => {
        this.relatedLoading.set(false);
      },
    });
  }

  goBack() {
    this.location.back();
  }

  setActiveImage(index: number) {
    this.activeImageIndex.set(index);
  }

  increaseQty(stock: number) {
    if (this.qty() < stock) this.qty.update((q) => q + 1);
  }

  decreaseQty() {
    if (this.qty() > 1) this.qty.update((q) => q - 1);
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
        this.cartService
          .addItem({ cartId: cart.id, productId: p.id, quantity: this.qty() })
          .subscribe({
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
