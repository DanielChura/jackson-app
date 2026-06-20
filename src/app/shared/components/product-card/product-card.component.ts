import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import type { ProductResponse } from '../../../core/models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <a
      [routerLink]="['/products', product().id]"
      class="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300"
    >
      <div class="flex aspect-square items-center justify-center rounded-lg bg-gray-50">
        <app-icon name="package" size="48" class="text-gray-300" />
      </div>
      <div class="flex flex-col gap-1">
        @if (product().category) {
          <span class="text-xs text-orange-500" style="font-weight:500">{{ product().category!.name }}</span>
        }
        <h3 class="text-gray-900" style="font-weight:500">{{ product().name }}</h3>
        <p class="text-lg text-gray-900" style="font-weight:500">${{ product().price.toFixed(2) }}</p>
      </div>
    </a>
  `,
})
export class ProductCardComponent {
  readonly product = input.required<ProductResponse>();
}
