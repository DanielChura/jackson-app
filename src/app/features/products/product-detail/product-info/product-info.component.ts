import { Component, input, output, signal } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { ProductResponse } from '../../../../core/models';
import { DecimalPipe, KeyValuePipe } from '@angular/common';

interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  imports: [IconComponent, DecimalPipe, KeyValuePipe],
})
export class ProductInfoComponent {
  p = input.required<ProductResponse>();
  addToCart = output<void>();
  toggleFavorite = output<void>();
  isExpanded = signal<boolean>(false);

  readonly trustItems: TrustItem[] = [
    {
      icon: 'truck',
      title: 'Envío Rápido',
      description: 'Entrega 24h en Lima. Despacho el mismo día para pedidos antes del mediodía.',
    },
    {
      icon: 'shield-check',
      title: 'Garantía Oficial',
      description: 'Respaldado por el fabricante. Cobertura total por 12 meses.',
    },
    {
      icon: 'tool',
      title: 'Inspección Técnica',
      description: 'Calibrado y verificado por nuestros expertos antes de enviarlo.',
    },
    {
      icon: 'headphones',
      title: 'Soporte Experto',
      description: 'Asesoría musical personalizada vía chat, llamada o presencial.',
    },
  ];
}
