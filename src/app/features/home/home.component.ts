import { Component, inject, signal } from '@angular/core';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { TrustBarComponent } from './sections/trust-bar/trust-bar.component';
import { AudienceSectionComponent } from './sections/audience-section/audience-section.component';
import { FeaturedDualComponent } from './sections/featured-dual/featured-dual.component';
import { CalloutSignupComponent } from '../../shared/components/callout-signup/callout-signup.component';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';
import { CollectionSectionComponent } from '../../shared/components/collection-section/collection-section.component';
import { CollectionCardComponent } from '../../shared/components/collection-card/collection-card.component';
import { ProductService } from '../../core/services/product.service';
import { BrandService } from '../../core/services/brand.service';
import { CategoryService } from '../../core/services/category.service';
import type { ProductResponse, BrandResponse, CategoryResponse } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TestimonialsComponent,
    TrustBarComponent,
    AudienceSectionComponent,
    FeaturedDualComponent,
    CalloutSignupComponent,
    ProductCarouselComponent,
    CollectionSectionComponent,
    CollectionCardComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly productService = inject(ProductService);
  private readonly brandService = inject(BrandService);
  private readonly categoryService = inject(CategoryService);

  protected readonly hotDeals = signal<ProductResponse[]>([]);
  protected readonly hotDealsLoading = signal(true);
  protected readonly hotDealsError = signal<string | null>(null);

  protected readonly bestsellers = signal<ProductResponse[]>([]);
  protected readonly bestsellersLoading = signal(true);
  protected readonly bestsellersError = signal<string | null>(null);

  protected readonly newArrivals = signal<ProductResponse[]>([]);
  protected readonly newArrivalsLoading = signal(true);
  protected readonly newArrivalsError = signal<string | null>(null);

  protected readonly brands = signal<BrandResponse[]>([]);
  protected readonly brandsLoading = signal(true);
  protected readonly brandsError = signal<string | null>(null);

  protected readonly categories = signal<CategoryResponse[]>([]);
  protected readonly categoriesLoading = signal(true);
  protected readonly categoriesError = signal<string | null>(null);

  constructor() {
    this.productService.getAll(0, 10, 'createdAt,desc').subscribe({
      next: (res) => {
        this.hotDeals.set(res.content);
        this.hotDealsLoading.set(false);
      },
      error: () => {
        this.hotDealsError.set('Error al cargar productos');
        this.hotDealsLoading.set(false);
      },
    });

    this.productService.getAll(0, 20, 'price,desc').subscribe({
      next: (res) => {
        this.bestsellers.set(res.content);
        this.bestsellersLoading.set(false);
      },
      error: () => {
        this.bestsellersError.set('Error al cargar productos');
        this.bestsellersLoading.set(false);
      },
    });

    this.productService.getAll(0, 20, 'createdAt,desc').subscribe({
      next: (res) => {
        this.newArrivals.set(res.content);
        this.newArrivalsLoading.set(false);
      },
      error: () => {
        this.newArrivalsError.set('Error al cargar productos');
        this.newArrivalsLoading.set(false);
      },
    });

    this.brandService.getAll(0, 10).subscribe({
      next: (res) => {
        this.brands.set(res.content);
        this.brandsLoading.set(false);
      },
      error: () => {
        this.brandsError.set('Error al cargar marcas');
        this.brandsLoading.set(false);
      },
    });

    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories.set(res.content);
        this.categoriesLoading.set(false);
      },
      error: () => {
        this.categoriesError.set('Error al cargar categorías');
        this.categoriesLoading.set(false);
      },
    });
  }
}
