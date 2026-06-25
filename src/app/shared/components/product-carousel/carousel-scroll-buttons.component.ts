import { Component, input, output } from '@angular/core';
import { IconComponent } from '../../icons/icon.component';

@Component({
  selector: 'app-carousel-scroll-buttons',
  standalone: true,
  imports: [IconComponent],
  template: `
    @if (visible()) {
      <button
        (click)="scroll.emit(direction())"
        class="absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-jackson-navy transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jackson-orange cursor-pointer"
        [class.-left-5]="direction() === 'left'"
        [class.-right-5]="direction() === 'right'"
        [attr.aria-label]="direction() === 'left' ? 'Anterior' : 'Siguiente'"
      >
        <app-icon [name]="direction() === 'left' ? 'chevron-left' : 'chevron-right'" size="24" />
      </button>
    }
  `,
})
export class CarouselScrollButtonsComponent {
  readonly direction = input.required<'left' | 'right'>();
  readonly visible = input(false);
  readonly scroll = output<'left' | 'right'>();
}
