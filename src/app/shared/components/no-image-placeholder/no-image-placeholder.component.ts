import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-image-placeholder',
  standalone: true,
  template: `
    <svg class="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#e5e9ee" />
      <g opacity="0.25">
        <rect x="60" y="30" width="80" height="80" rx="8" stroke="#0f191e" stroke-width="1.5" />
        <circle cx="90" cy="60" r="10" stroke="#0f191e" stroke-width="1.5" />
        <path
          d="M62 110 L85 88 L100 102 L115 90 L138 110"
          stroke="#0f191e"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
      <text
        x="100"
        y="165"
        text-anchor="middle"
        fill="#0f191e"
        fill-opacity="0.25"
        font-size="11"
        font-weight="500"
        font-family="sans-serif"
      >
        {{ text() }}
      </text>
    </svg>
  `,
})
export class NoImagePlaceholderComponent {
  readonly text = input('Sin imagen');
}
