import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route()"
      [queryParams]="queryParams()"
      class="relative aspect-[3/4] block overflow-hidden rounded-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jackson-navy"
      [class]="bgClass()"
    >
      @if (imageUrl(); as url) {
        <img [src]="url" [alt]="name()" class="h-full w-full object-cover" loading="lazy" />
      } @else {
        <div class="flex h-full w-full items-center justify-center">
          <span
            class="text-sm font-medium text-center text-jackson-charcoal/30 px-4 leading-tight"
            >{{ name() }}</span
          >
        </div>
      }
    </a>
  `,
})
export class CollectionCardComponent {
  readonly imageUrl = input<string | null>(null);
  readonly name = input<string>('');
  readonly route = input<string | string[]>('');
  readonly queryParams = input<Record<string, any>>({});
  readonly bgClass = input<string>('bg-jackson-surface');
}
