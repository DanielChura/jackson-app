import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { BrandService } from '../../../../core/services/brand.service';
import type { BrandResponse } from '../../../../core/models';

@Component({
  selector: 'app-brand-strip',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './brand-strip.component.html',
})
export class BrandStripComponent {
  private readonly brandService = inject(BrandService);

  protected readonly brands = signal<BrandResponse[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    this.brandService.getAll(0, 20).subscribe({
      next: (res) => {
        this.brands.set(res.content);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message ?? 'Error al cargar marcas');
        this.loading.set(false);
      },
    });
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: -(container.clientWidth / 2), behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
  }
}
