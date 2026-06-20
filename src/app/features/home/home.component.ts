import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import type { ProductResponse, CategoryResponse } from '../../core/models';

const BANNERS = [
  'https://scontent.flim18-1.fna.fbcdn.net/v/t39.30808-6/707678772_1409955131164708_4199380676657240043_n.jpg?stp=dst-jpg_tt6&cstp=mx3559x1178&ctp=s3559x1178&_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=3ZFvS6xc2m4Q7kNvwGYE8Qk&_nc_oc=AdqUVuhnhJQije71j2_4i_jhiBQDo4p-ccW0IfCD6FR_gFdILCeQGCaEZAl_xE2y176NXazOY2cPkqgWsVnJKDDq&_nc_zt=23&_nc_ht=scontent.flim18-1.fna&_nc_gid=MLnjqBAkpBgtgyWRk0p_tQ&_nc_ss=7b2a8&oh=00_Af8__2HfW-k5C1W1AMR8Gz4h_KLhb0PZJIl3WKUut5o3EA&oe=6A3BDB98',
  'https://audiomusicacl.vtexassets.com/assets/vtex.file-manager-graphql/images/746a971b-33b8-43b9-90d8-f3967353bab0___940d8209f7638868239d5209ac6c3f8d.png',
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, PaginatorComponent, SpinnerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private intervalRef: ReturnType<typeof setInterval> | null = null;

  protected readonly banners = BANNERS;
  protected readonly currentSlide = signal(0);

  readonly products = signal<ProductResponse[]>([]);
  readonly categories = signal<CategoryResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);
  readonly search = signal('');
  readonly selectedCategoryId = signal('');

  constructor() {
    this.loadCategories();
    this.loadProducts();
    this.startAutoSlide();
  }

  private loadCategories() {
    this.categoryService.getAll(0, 100).subscribe({
      next: (res) => this.categories.set(res.content),
    });
  }

  loadProducts() {
    this.loading.set(true);
    this.productService
      .getAll(this.page(), 12, {
        name: this.search() || undefined,
        category: this.selectedCategoryId() || undefined,
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

  onSearch(value: string) {
    this.search.set(value);
    this.page.set(0);
    this.loadProducts();
  }

  onCategoryChange(value: string) {
    this.selectedCategoryId.set(value);
    this.page.set(0);
    this.loadProducts();
  }

  prev() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.loadProducts();
    }
  }

  next() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update((p) => p + 1);
      this.loadProducts();
    }
  }

  private startAutoSlide() {
    this.intervalRef = setInterval(() => {
      this.currentSlide.update(i => (i + 1) % this.banners.length);
    }, 5000);
  }

  protected goToSlide(index: number) {
    this.currentSlide.set(index);
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }
}
