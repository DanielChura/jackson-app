import { Component, input } from '@angular/core';
import { icons, IconName } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="icons[name()].viewBox"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.fill]="fill()"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @for (path of icons[name()].paths; track $index) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
})
export class IconComponent {
  name = input.required<IconName>();
  size = input<string | number>(24);
  fill = input<string>('none');

  protected readonly icons = icons;
}
