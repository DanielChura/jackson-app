import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/icons/icon.component';

interface BrandData {
  name: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-brand-strip',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './brand-strip.component.html',
})
export class BrandStripComponent {
  protected readonly brands: BrandData[] = [
    {
      name: 'FENDER',
      slug: 'fender',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'Gibson',
      slug: 'gibson',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'YAMAHA',
      slug: 'yamaha',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'Roland',
      slug: 'roland',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'MARSHALL',
      slug: 'marshall',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'SHURE',
      slug: 'shure',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'AKG',
      slug: 'akg',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
    {
      name: 'PIONEER',
      slug: 'pioneer',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_khUbKFSLuLxKVOyKHScYy7SMSyZmmQgC_w&s',
    },
  ];

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
