import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ProductService } from '../../../../core/services/product.service';
import type { ProductResponse } from '../../../../core/models';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './bestsellers.component.html',
})
export class BestsellersComponent {
  private readonly productService = inject(ProductService);

  protected readonly products = signal<ProductResponse[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.productService.getAll(0, 5, 'price,desc').subscribe({
      next: (res) => {
        this.products.set(res.content);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar productos');
        this.loading.set(false);
      },
    });
  }
}
