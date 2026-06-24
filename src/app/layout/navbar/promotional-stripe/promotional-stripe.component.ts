import { Component } from '@angular/core';

@Component({
  selector: 'app-promotional-stripe',
  standalone: true,
  template: `
    <aside class="bg-jackson-navy py-2 overflow-hidden select-none">
      <div class="animate-marquee flex whitespace-nowrap hover:[animation-play-state:paused]">
        @for (promo of promos; track $index) {
          <span class="text-xs font-medium text-white tracking-wider uppercase mx-8">{{
            promo
          }}</span>
        }
        @for (promo of promos; track $index) {
          <span
            class="text-xs font-medium text-white tracking-wider uppercase mx-8"
            aria-hidden="true"
            >{{ promo }}</span
          >
        }
      </div>
    </aside>
  `,
})
export class PromotionalStripeComponent {
  protected readonly promos = [
    'financiamiento hasta 12 cuotas sin intereses con todas las tarjetas',
    'envío gratis a todo lima en pedidos mayores a s/ 399 — entregas en 24 horas',
    'financiamiento hasta 12 cuotas sin intereses con todas las tarjetas',
    'envío gratis a todo lima en pedidos mayores a s/ 399 — entregas en 24 horas',
  ];
}
