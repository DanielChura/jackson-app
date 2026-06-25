import { Component } from '@angular/core';

@Component({
  selector: 'app-promotional-stripe',
  standalone: true,
  template: `
    <aside class="bg-jackson-navy py-1 select-none text-center">
      <span class="text-[10px] font-medium text-white tracking-wider uppercase">
        {{ promo }}
      </span>
    </aside>
  `,
})
export class PromotionalStripeComponent {
  protected readonly promo =
    'financiamiento hasta 12 cuotas sin intereses con todas las tarjetas | envío gratis a todo lima en pedidos mayores a s/ 399 — entregas en 24 horas';
}
