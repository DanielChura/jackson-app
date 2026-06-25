import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryResponse } from '../../../../core/models';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-grid.component.html',
})
export class CategoryGridComponent {
  categories = input.required<CategoryResponse[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  // Limit to exactly 8 elements
  displayCategories = computed(() => this.categories().slice(0, 8));
}
