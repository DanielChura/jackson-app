import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import type { ProductResponse } from '../../../../core/models';
import { ProductCarouselComponent } from '../../../../shared/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-audience-section',
  standalone: true,
  imports: [RouterLink, ProductCarouselComponent],
  templateUrl: './audience-section.component.html',
})
export class AudienceSectionComponent {
  private readonly productService = inject(ProductService);

  protected readonly products = signal<ProductResponse[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly bannerImageUrl = '/images/easy-pay.webp';
  protected readonly bannerRouterLink = ['/products'];
  protected readonly bannerQueryParams = { sort: 'price,asc' };

  constructor() {
    this.productService.getAll(0, 20, 'price,asc').subscribe({
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
