import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FavoriteService } from '../../../core/services/favorite.service';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import type { ProductResponse } from '../../../core/models';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, SpinnerComponent],
  templateUrl: './favorites-list.component.html',
})
export class FavoritesListComponent {
  private readonly favoriteService = inject(FavoriteService);
  private readonly productService = inject(ProductService);
  private readonly auth = inject(AuthService);

  readonly products = signal<ProductResponse[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    const user = this.auth.currentUser();
    if (!user) {
      this.error.set('Debés iniciar sesión para ver tus favoritos');
      this.loading.set(false);
      return;
    }

    this.favoriteService.getByUser(user.email).subscribe({
      next: (favs) => {
        if (favs.length === 0) {
          this.loading.set(false);
          return;
        }
        forkJoin(favs.map((f) => this.productService.getById(f.productId))).subscribe({
          next: (results) => {
            this.products.set(results);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
      },
      error: () => {
        this.error.set('No se pudieron cargar los favoritos');
        this.loading.set(false);
      },
    });
  }
}
