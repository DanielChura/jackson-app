import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import type { ProductResponse } from '../../../core/models';

const CATEGORY_ICONS: Record<string, string> = {
  Guitarras: 'guitar',
  Baterías: 'music',
  Teclados: 'radio',
  'Audio y micrófonos': 'mic',
  'Equipos de DJ': 'disc',
  Accesorios: 'headphones',
};

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  readonly product = input.required<ProductResponse>();

  protected readonly iconName = computed(() => {
    const cat = this.product().category;
    return cat ? CATEGORY_ICONS[cat.name] : null;
  });
}
