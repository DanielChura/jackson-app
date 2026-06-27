import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface StaticCategory {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-grid.component.html',
})
export class CategoryGridComponent {
  readonly categories: StaticCategory[] = [
    {
      name: 'Guitarra Eléctrica',
      imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5278f?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Bajo Eléctrico',
      imageUrl: 'https://images.unsplash.com/photo-1541256996761-85df2eff3139?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Guitarra Acústica',
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Batería Acústica',
      imageUrl: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Teclados',
      imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Piano Digital',
      imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Amplificadores',
      imageUrl: 'https://images.unsplash.com/photo-1598127811176-59758913329f?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Pedales de Efectos',
      imageUrl: 'https://images.unsplash.com/photo-1597627249943-2941957db383?q=80&w=600&auto=format&fit=crop'
    }
  ];
}
