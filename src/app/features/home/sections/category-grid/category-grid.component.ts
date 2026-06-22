import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { CategoryService } from '../../../../core/services/category.service';
import type { CategoryResponse } from '../../../../core/models';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './category-grid.component.html',
})
export class CategoryGridComponent {
  private readonly categoryService = inject(CategoryService);

  protected readonly categories = signal<CategoryResponse[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    this.categoryService.getAll(0, 20).subscribe({
      next: (res) => {
        this.categories.set(res.content);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message ?? 'Error al cargar categorías');
        this.loading.set(false);
      },
    });
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: -(container.clientWidth / 2), behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
  }
}
