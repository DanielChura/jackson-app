import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  template: `
    <div class="flex items-center justify-between">
      <p class="text-sm text-jackson-text-secondary font-normal">
        {{ totalElements() }} {{ label() }}
      </p>
      <div class="flex items-center gap-2">
        <button
          (click)="prev.emit()"
          [disabled]="page() === 0"
          class="bg-jackson-surface px-3 py-1.5 text-sm text-jackson-charcoal font-medium hover:bg-jackson-surface disabled:opacity-40"
        >
          Anterior
        </button>
        <span class="text-sm text-jackson-text-secondary font-normal"
          >Pág. {{ page() + 1 }} de {{ totalPages() }}</span
        >
        <button
          (click)="next.emit()"
          [disabled]="page() >= totalPages() - 1"
          class="bg-jackson-surface px-3 py-1.5 text-sm text-jackson-charcoal font-medium hover:bg-jackson-surface disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  `,
})
export class PaginatorComponent {
  page = input.required<number>();
  totalPages = input.required<number>();
  totalElements = input.required<number>();
  label = input.required<string>();

  prev = output<void>();
  next = output<void>();
}
