import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ProductService } from '../../../../core/services/product.service';
import type { ProductResponse } from '../../../../core/models';

@Component({
  selector: 'app-audience-section',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './audience-section.component.html',
})
export class AudienceSectionComponent implements OnInit {
  private readonly productService = inject(ProductService);

  protected readonly products = signal<ProductResponse[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit() {
    this.productService.getAll(0, 6, 'price,asc').subscribe({
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
