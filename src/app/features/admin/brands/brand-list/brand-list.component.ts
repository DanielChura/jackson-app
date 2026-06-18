import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../../core/services/brand.service';
import { BrandResponse } from '../../../../core/models';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-list.component.html',
})
export class BrandListComponent {
  private readonly brandService = inject(BrandService);

  readonly brands = signal<BrandResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.brandService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.brands.set(res.content);
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
    if (!confirm('¿Eliminar esta marca?')) return;
    this.brandService.delete(id).subscribe(() => this.load());
  }
}
