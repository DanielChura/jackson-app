import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import type { ProductResponse } from '../../../core/models';

@Component({
  selector: 'app-split-promo-section',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './split-promo-section.component.html',
})
export class SplitPromoSectionComponent {
  readonly products = input.required<ProductResponse[]>();
  readonly bannerTitle = input<string>('Ofertas Musicales');
  readonly bannerLink = input<string[]>(['/products']);
}
