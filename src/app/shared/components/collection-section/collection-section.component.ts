import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  effect,
  ElementRef,
  input,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselScrollButtonsComponent } from '../product-carousel/carousel-scroll-buttons.component';

@Component({
  selector: 'app-collection-section',
  standalone: true,
  imports: [CarouselScrollButtonsComponent, NgTemplateOutlet, RouterLink],
  template: `
    @if (loading()) {
      <div class="flex items-center justify-center py-20">
        <span class="text-jackson-charcoal/40 font-medium">Cargando...</span>
      </div>
    } @else if (error(); as err) {
      <div class="flex items-center justify-center py-20">
        <span class="text-jackson-charcoal/40 font-medium">{{ err }}</span>
      </div>
    } @else {
      @if (title()) {
        <div class="flex items-center justify-between mb-8">
          <h2 class="max-w-sm text-2xl md:max-w-xs font-medium text-jackson-charcoal">
            {{ title() }}
          </h2>
          @if (viewAllRoute(); as route) {
            <a
              [routerLink]="route"
              [queryParams]="viewAllQueryParams()"
              class="text-sm font-medium text-jackson-navy hover:text-jackson-navy-hover underline"
            >
              Ver todos
            </a>
          }
        </div>
      }
      <div class="relative">
        <app-carousel-scroll-buttons
          direction="left"
          [visible]="canScrollLeft()"
          (scroll)="scroll('left')"
        />
        <div
          #scrollContainer
          (scroll)="checkScrollLimits()"
          class="flex gap-4 overflow-x-auto pb-4 snap-x snap-proximity scroll-smooth scrollbar-none"
        >
          @for (item of items(); track $index) {
            <div [class]="itemClass()" class="shrink-0 snap-start">
              <ng-container
                *ngTemplateOutlet="itemTemplate || null; context: { $implicit: item }"
              />
            </div>
          }
        </div>
        <app-carousel-scroll-buttons
          direction="right"
          [visible]="canScrollRight()"
          (scroll)="scroll('right')"
        />
      </div>
    }
  `,
})
export class CollectionSectionComponent<T> {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<{ $implicit: T }>;

  readonly items = input<T[]>([]);
  readonly loading = input<boolean>(false);
  viewAllRoute = input.required<string | any[] | null>();
  viewAllQueryParams = input.required<Record<string, any> | undefined>();
  readonly error = input<string | null>(null);
  readonly title = input<string>('');
  readonly itemClass = input<string>('');

  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(false);

  constructor() {
    effect(() => {
      if (!this.loading() && this.items().length > 0) {
        setTimeout(() => this.checkScrollLimits(), 50);
      }
    });
  }

  protected scroll(direction: 'left' | 'right'): void {
    if (!this.scrollContainer) return;
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({
      left: direction === 'left' ? -container.clientWidth * 0.75 : container.clientWidth * 0.75,
    });
  }

  protected checkScrollLimits(): void {
    if (!this.scrollContainer) return;
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer.nativeElement;
    this.canScrollLeft.set(scrollLeft > 2);
    this.canScrollRight.set(scrollLeft < scrollWidth - clientWidth - 2);
  }
}
