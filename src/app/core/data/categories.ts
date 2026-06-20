export interface CategoryData {
  name: string;
  slug: string;
  icon: string;
  count: number;
  image: string;
}

export const CATEGORIES: CategoryData[] = [
  {
    name: 'Guitarras',
    slug: 'guitarras',
    icon: 'guitar',
    count: 42,
    image: 'https://www.culturekings.com/cdn/shop/files/washed-green-mobile_ea10c132-1c5c-470b-8fe3-24df92775a6e.jpg?v=1781812575&width=768',
  },
  {
    name: 'Baterías',
    slug: 'baterias',
    icon: 'music',
    count: 28,
    image: 'https://www.culturekings.com/cdn/shop/files/washed-green-mobile_ea10c132-1c5c-470b-8fe3-24df92775a6e.jpg?v=1781812575&width=768',
  },
  {
    name: 'Teclados',
    slug: 'teclados',
    icon: 'radio',
    count: 35,
    image: 'https://www.culturekings.com/cdn/shop/files/washed-green-mobile_ea10c132-1c5c-470b-8fe3-24df92775a6e.jpg?v=1781812575&width=768',
  },
  {
    name: 'Audio y micrófonos',
    slug: 'audio-microfonos',
    icon: 'mic',
    count: 56,
    image: 'https://www.culturekings.com/cdn/shop/files/washed-green-mobile_ea10c132-1c5c-470b-8fe3-24df92775a6e.jpg?v=1781812575&width=768',
  },
  {
    name: 'Equipos de DJ',
    slug: 'equipos-dj',
    icon: 'disc',
    count: 19,
    image: 'https://www.culturekings.com/cdn/shop/files/washed-green-mobile_ea10c132-1c5c-470b-8fe3-24df92775a6e.jpg?v=1781812575&width=768',
  },
  {
    name: 'Accesorios',
    slug: 'accesorios',
    icon: 'headphones',
    count: 73,
    image: 'https://www.culturekings.com/cdn/shop/files/washed-green-mobile_ea10c132-1c5c-470b-8fe3-24df92775a6e.jpg?v=1781812575&width=768',
  },
];
