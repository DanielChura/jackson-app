import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { BrandService } from '../../../core/services/brand.service';
import type { ProductResponse, CategoryResponse, BrandResponse } from '../../../core/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, ProductCardComponent, SpinnerComponent, PaginatorComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);

  readonly products = signal<ProductResponse[]>([]);
  readonly categories = signal<CategoryResponse[]>([]);
  readonly brands = signal<BrandResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  filterName = '';
  filterCategory = '';
  filterBrand = '';

  constructor() {
    this.categoryService.getAll(0, 50).subscribe((res) => this.categories.set(res.content));
    this.brandService.getAll(0, 50).subscribe((res) => this.brands.set(res.content));
    this.load();
  }

  load() {
    this.loading.set(true);
    this.productService
      .getAll(this.page(), 20, undefined, {
        name: this.filterName || undefined,
        category: this.filterCategory || undefined,
        brand: this.filterBrand || undefined,
      })
      .subscribe({
        next: (res) => {
          this.products.set(res.content);
          this.totalPages.set(res.totalPages);
          this.totalElements.set(res.totalElements);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  applyFilters() {
    this.page.set(0);
    this.load();
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
