import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { MOCK_PRODUCTS } from '../../../../core/data/products.mock';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './new-arrivals.component.html',
})
export class NewArrivalsComponent {
  protected readonly products = MOCK_PRODUCTS.slice(0, 4);
}
