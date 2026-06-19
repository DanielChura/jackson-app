import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { ProductResponse } from '../../../../core/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);

  readonly products = signal<ProductResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.productService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.products.set(res.content);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
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

  delete(id: string) {
    if (!confirm('¿Eliminar este producto?')) return;
    this.productService.delete(id).subscribe(() => this.load());
  }
}
