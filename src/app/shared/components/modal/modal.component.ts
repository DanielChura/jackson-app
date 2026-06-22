import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        (click)="onBackdropClick()"
      >
        <div
          class="relative w-full max-w-lg bg-jackson-white p-6 max-h-[85vh] overflow-y-auto"
          (click)="$event.stopPropagation()"
        >
          <button
            (click)="close.emit()"
            class="absolute right-4 top-4 text-jackson-text/40 hover:text-jackson-text transition-colors text-lg leading-none"
            aria-label="Cerrar"
          >
            &times;
          </button>
          <ng-content />
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  readonly open = input(false);
  readonly close = output();

  onBackdropClick() {
    this.close.emit();
  }
}
