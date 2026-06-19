import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  template: `
    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-400" style="font-weight:400">{{ totalElements() }} {{ label() }}</p>
      <div class="flex items-center gap-2">
        <button
          (click)="prev.emit()"
          [disabled]="page() === 0"
          class="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:border-gray-300 disabled:opacity-40"
          style="font-weight:500"
        >
          Anterior
        </button>
        <span class="text-sm text-gray-500" style="font-weight:400">Pág. {{ page() + 1 }} de {{ totalPages() }}</span>
        <button
          (click)="next.emit()"
          [disabled]="page() >= totalPages() - 1"
          class="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:border-gray-300 disabled:opacity-40"
          style="font-weight:500"
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
