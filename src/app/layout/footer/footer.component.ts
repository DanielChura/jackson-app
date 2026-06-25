import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icons/icon.component';
import { IconName } from '../../shared/icons/icons';
import { BrandStripeComponent } from '../../shared/components/brand-stripe/brand-stripe.component';

interface FooterLink {
  label: string;
  route: string;
  queryParams?: Record<string, string>;
}

interface SocialLink {
  name: string;
  icon: IconName;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent, BrandStripeComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Lista expandida de categorías estratégicas de alto tráfico
  categories: FooterLink[] = [
    {
      label: 'Guitarras Eléctricas',
      route: '/products',
      queryParams: { category: 'guitarras-electricas' },
    },
    {
      label: 'Guitarras Acústicas',
      route: '/products',
      queryParams: { category: 'guitarras-acusticas' },
    },
    {
      label: 'Bajos Eléctricos',
      route: '/products',
      queryParams: { category: 'bajos-electricos' },
    },
    { label: 'Pianos & Teclados', route: '/products', queryParams: { category: 'teclados' } },
    { label: 'Baterías & Percusión', route: '/products', queryParams: { category: 'baterias' } },
    { label: 'Equipos de Audio & DJ', route: '/products', queryParams: { category: 'pro-audio' } },
    { label: 'Accesorios Premium', route: '/products', queryParams: { category: 'accesorios' } },
  ];

  // Lista expandida de marcas premium para posicionamiento SEO
  brands: FooterLink[] = [
    { label: 'Fender Custom Shop', route: '/products', queryParams: { brand: 'fender' } },
    { label: 'Gibson USA', route: '/products', queryParams: { brand: 'gibson' } },
    { label: 'Yamaha Music', route: '/products', queryParams: { brand: 'yamaha' } },
    { label: 'Roland', route: '/products', queryParams: { brand: 'roland' } },
    { label: 'Ibanez Guitars', route: '/products', queryParams: { brand: 'ibanez' } },
    { label: 'Taylor Guitars', route: '/products', queryParams: { brand: 'taylor' } },
    { label: 'Pioneer DJ', route: '/products', queryParams: { brand: 'pioneer-dj' } },
    { label: 'Shure Microphones', route: '/products', queryParams: { brand: 'shure' } },
  ];

  support: FooterLink[] = [
    { label: 'Centro de Soporte Especializado', route: '/soporte' },
    { label: 'Seguimiento de Envíos en Lima', route: '/pedidos/rastreo' },
    { label: 'Taller de Luthier & Garantías', route: '/luthier' },
    { label: 'Políticas de Devolución', route: '/devoluciones' },
  ];

  legal: FooterLink[] = [
    { label: 'Términos y Condiciones', route: '/legal/terminos' },
    { label: 'Políticas de Privacidad', route: '/legal/privacidad' },
    { label: 'Libro de Reclamaciones', route: '/legal/reclamaciones' },
  ];

  socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/jacksonmusic', icon: 'instagram' },
    { name: 'Facebook', url: 'https://facebook.com/jacksonmusic', icon: 'facebook' },
    { name: 'YouTube', url: 'https://youtube.com/jacksonmusic', icon: 'youtube' },
  ];
}
