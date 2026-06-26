import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ProductCarouselComponent } from '../../../shared/components/product-carousel/product-carousel.component';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { BrandService } from '../../../core/services/brand.service';
import { ToastService } from '../../../core/services/toast.service';
import type { ProductResponse, CategoryResponse, BrandResponse } from '../../../core/models';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [
    FormsModule,
    NgTemplateOutlet,
    ProductCardComponent,
    SpinnerComponent,
    PaginatorComponent,
    ModalComponent,
    ProductCarouselComponent,
  ],
  templateUrl: './product-catalog.component.html',
})
export class ProductCatalogComponent {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly toast = inject(ToastService);

  readonly products = signal<ProductResponse[]>([]);
  readonly categories = signal<CategoryResponse[]>([]);
  readonly brands = signal<BrandResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);
  readonly isFilterModalOpen = signal(false);

  filterName = '';
  filterCategory = '';
  filterBrand = '';
  filterMinPrice: number | null = null;
  filterMaxPrice: number | null = null;
  filterSort = '';

  constructor() {
    this.categoryService.getAll(0, 50).subscribe({
      next: (res) => this.categories.set(res.content),
    });
    this.brandService.getAll(0, 50).subscribe({
      next: (res) => this.brands.set(res.content),
    });
    this.load();
  }

  load() {
    this.loading.set(true);
    this.productService
      .getAll(this.page(), 20, this.filterSort || undefined, {
        name: this.filterName || undefined,
        category: this.filterCategory || undefined,
        brand: this.filterBrand || undefined,
        minPrice: this.filterMinPrice || undefined,
        maxPrice: this.filterMaxPrice || undefined,
      })
      .subscribe({
        next: (res) => {
          this.products.set(res.content);
          this.totalPages.set(res.totalPages);
          this.totalElements.set(res.totalElements);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.toast.show('No se pudieron cargar los productos', 'error');
        },
      });
  }

  applyFilters() {
    this.page.set(0);
    this.isFilterModalOpen.set(false);
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
