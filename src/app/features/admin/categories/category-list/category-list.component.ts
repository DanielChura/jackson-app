import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CategoryResponse } from '../../../../core/models';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, PaginatorComponent],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly toast = inject(ToastService);

  readonly categories = signal<CategoryResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.categoryService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.categories.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('No se pudieron cargar las categorías', 'error');
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
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.toast.show('Categoría eliminada');
        this.load();
      },
      error: () => this.toast.show('No se pudo eliminar la categoría', 'error'),
    });
  }
}
