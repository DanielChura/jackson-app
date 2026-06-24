import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FeaturedItem {
  imageUrl: string;
  slug: string;
}

@Component({
  selector: 'app-featured-dual',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './featured-dual.component.html',
})
export class FeaturedDualComponent {
  readonly primary = input.required<FeaturedItem>();
  readonly secondary = input.required<FeaturedItem>();
}
