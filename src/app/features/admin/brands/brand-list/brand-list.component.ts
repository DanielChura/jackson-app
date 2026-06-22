import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { BrandService } from '../../../../core/services/brand.service';
import { ToastService } from '../../../../core/services/toast.service';
import { BrandResponse } from '../../../../core/models';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, PaginatorComponent],
  templateUrl: './brand-list.component.html',
})
export class BrandListComponent {
  private readonly brandService = inject(BrandService);
  private readonly toast = inject(ToastService);

  readonly brands = signal<BrandResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.brandService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.brands.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('No se pudieron cargar las marcas', 'error');
      },
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
    this.brandService.delete(id).subscribe({
      next: () => {
        this.toast.show('Marca eliminada');
        this.load();
      },
      error: () => this.toast.show('No se pudo eliminar la marca', 'error'),
    });
  }
}
