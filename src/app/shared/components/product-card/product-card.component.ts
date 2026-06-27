import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoImagePlaceholderComponent } from '../no-image-placeholder/no-image-placeholder.component';
import type { ProductResponse } from '../../../core/models';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NoImagePlaceholderComponent, CurrencyPipe, DecimalPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  readonly product = input.required<ProductResponse>();
}
