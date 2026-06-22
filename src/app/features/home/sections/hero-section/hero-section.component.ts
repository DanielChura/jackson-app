import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  currentIndex = signal<number>(0);
  private autoPlayInterval: any;

  slides = signal<any[]>([
    {
      label: 'Reloop DJ',
      imageUrl:
        'https://audiomusicacl.vtexassets.com/assets/vtex.file-manager-graphql/images/746a971b-33b8-43b9-90d8-f3967353bab0___940d8209f7638868239d5209ac6c3f8d.png',
      mobileImageUrl:
        'https://audiomusicacl.vtexassets.com/assets/vtex.file-manager-graphql/images/746a971b-33b8-43b9-90d8-f3967353bab0___940d8209f7638868239d5209ac6c3f8d.png',
      link: '/products/reloop',
      alt: 'Nuevas llegadas Reloop DJ',
    },
    {
      label: 'Especial Guitarras',
      imageUrl:
        'https://audiomusicacl.vtexassets.com/assets/vtex.file-manager-graphql/images/746a971b-33b8-43b9-90d8-f3967353bab0___940d8209f7638868239d5209ac6c3f8d.png',
      mobileImageUrl:
        'https://audiomusicacl.vtexassets.com/assets/vtex.file-manager-graphql/images/746a971b-33b8-43b9-90d8-f3967353bab0___940d8209f7638868239d5209ac6c3f8d.png',
      link: '/catalogo/guitarras',
      alt: 'Especial de Guitarras Eléctricas',
    },
  ]);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide(): void {
    this.currentIndex.update((index) => (index + 1) % this.slides().length);
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.startAutoPlay();
  }
}
