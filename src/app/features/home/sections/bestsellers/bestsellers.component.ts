import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { MOCK_PRODUCTS } from '../../../../core/data/products.mock';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './bestsellers.component.html',
})
export class BestsellersComponent {
  protected readonly products = MOCK_PRODUCTS.slice(0, 5);
}
