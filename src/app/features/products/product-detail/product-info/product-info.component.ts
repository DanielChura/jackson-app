import { Component, input, output } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { ProductResponse } from '../../../../core/models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  imports: [IconComponent, DecimalPipe],
})
export class ProductInfoComponent {
  p = input.required<ProductResponse>();
  qty = input(1);

  increase = output<void>();
  decrease = output<void>();
  addToCart = output<void>();
  toggleFavorite = output<void>();
}
