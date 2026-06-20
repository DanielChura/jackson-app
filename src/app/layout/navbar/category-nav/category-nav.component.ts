import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-category-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-nav.component.html',
})
export class CategoryNavComponent {
  readonly links = input.required<NavLink[]>();
  readonly navigate = output<void>();
}
