import { Component, ElementRef, effect, input, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselScrollButtonsComponent } from './carousel-scroll-buttons.component';
import { ProductResponse } from '../../../core/models';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, CarouselScrollButtonsComponent],
  templateUrl: './product-carousel.component.html',
})
export class ProductCarouselComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  readonly title = input<string>('');
  readonly viewAllRoute = input<string>();
  readonly viewAllQueryParams = input<Record<string, any>>({});
  readonly products = input<ProductResponse[]>([]);
  readonly loading = input<boolean>(false);
  readonly error = input<string | null>(null);

  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(false);

  readonly cardWidthClass = input<string>(
    'w-[calc(80%-0.5rem)] md:w-[calc(25%-0.9rem)] lg:w-[calc(20%-0.85rem)]',
  );

  constructor() {
    effect(() => {
      if (!this.loading() && this.products().length > 0) {
        setTimeout(() => this.checkScrollLimits(), 50);
      }
    });
  }

  protected scroll(direction: 'left' | 'right'): void {
    if (!this.scrollContainer) return;

    const container = this.scrollContainer.nativeElement;
    const scrollAmount = container.clientWidth * 0.75;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }

  protected checkScrollLimits(): void {
    if (!this.scrollContainer) return;

    const container = this.scrollContainer.nativeElement;
    this.canScrollLeft.set(container.scrollLeft > 2);
    this.canScrollRight.set(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 2,
    );
  }
}
