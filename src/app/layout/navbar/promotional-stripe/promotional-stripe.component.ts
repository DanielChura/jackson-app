import { Component } from '@angular/core';

@Component({
  selector: 'app-promotional-stripe',
  standalone: true,
  template: `
    <aside class="bg-jackson-navy select-none">
      <div
        class="max-w-[1600px] mx-auto w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 py-2 gap-2 sm:gap-0"
      >
        <span class="text-xs font-medium text-white tracking-wider uppercase text-center">
          ¡Síguenos en nuestras redes y participa por una Jackson Dinky JS22!
        </span>

        <div
          class="hidden sm:flex items-center gap-4 text-xs font-medium text-white tracking-wider uppercase"
        >
          <a
            href="https://facebook.com/tu-pagina"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/tu-pagina"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            Instagram
          </a>
          <a
            href="https://instagram.com/tu-pagina"
            target="_blank"
            rel="noopener noreferrer"
            class="underline "
          >
            Youtube
          </a>
        </div>
      </div>
    </aside>
  `,
})
export class PromotionalStripeComponent {}
