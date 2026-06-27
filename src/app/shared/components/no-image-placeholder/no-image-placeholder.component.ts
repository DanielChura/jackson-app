import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-image-placeholder',
  standalone: true,
  template: `
    <div class="rounded-md border bg-gray-100 flex items-center justify-center">
      {{ text() }}
    </div>
  `,
})
export class NoImagePlaceholderComponent {
  readonly text = input('Sin imagen');
}
