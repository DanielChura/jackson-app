import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="flex flex-col items-center gap-3">
      <svg
        class="animate-spin"
        [attr.width]="size()"
        [attr.height]="size()"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      @if (text()) {
        <span class="text-sm text-gray-400" style="font-weight:400">{{ text() }}</span>
      }
    </div>
  `,
})
export class SpinnerComponent {
  size = input<string | number>(24);
  text = input<string>();
}
