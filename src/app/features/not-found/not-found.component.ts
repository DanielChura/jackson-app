import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto w-full max-w-[1600px] px-6 py-24 text-center">
      <h1 class="text-6xl text-jackson-navy font-medium">404</h1>
      <p class="mt-4 text-lg text-jackson-charcoal/50 font-normal">Esta página no existe</p>
      <a
        routerLink="/"
        class="mt-8 inline-block bg-jackson-navy text-white px-8 py-3 text-sm font-medium transition-colors hover:bg-jackson-navy-hover"
      >
        Volver al inicio
      </a>
    </div>
  `,
})
export class NotFoundComponent {}
