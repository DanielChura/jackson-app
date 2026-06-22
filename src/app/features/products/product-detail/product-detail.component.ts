import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { ProductService } from '../../../core/services/product.service';
import type { ProductResponse } from '../../../core/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly location = inject(Location);

  readonly product = signal<ProductResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

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
      error: (err) => {
        this.error.set(err.message ?? 'Error al cargar producto');
        this.loading.set(false);
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
