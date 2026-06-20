import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { CATEGORIES } from '../../../../core/data/categories';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './category-grid.component.html',
})
export class CategoryGridComponent {
  protected readonly categories = CATEGORIES;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: -(container.clientWidth / 2), behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
  }
}
