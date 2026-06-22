import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icons/icon.component';
import { IconName } from '../../shared/icons/icons';

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
  imports: [RouterLink, IconComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Lista expandida de categorías estratégicas de alto tráfico
  categories: FooterLink[] = [
    {
      label: 'Guitarras Eléctricas',
      route: '/catalogo',
      queryParams: { cat: 'guitarras-electricas' },
    },
    {
      label: 'Guitarras Acústicas',
      route: '/catalogo',
      queryParams: { cat: 'guitarras-acusticas' },
    },
    { label: 'Bajos Eléctricos', route: '/catalogo', queryParams: { cat: 'bajos-electricos' } },
    { label: 'Pianos & Teclados', route: '/catalogo', queryParams: { cat: 'teclados' } },
    { label: 'Baterías & Percusión', route: '/catalogo', queryParams: { cat: 'baterias' } },
    { label: 'Equipos de Audio & DJ', route: '/catalogo', queryParams: { cat: 'pro-audio' } },
    { label: 'Accesorios Premium', route: '/catalogo', queryParams: { cat: 'accesorios' } },
  ];

  // Lista expandida de marcas premium para posicionamiento SEO
  brands: FooterLink[] = [
    { label: 'Fender Custom Shop', route: '/catalogo', queryParams: { brand: 'fender' } },
    { label: 'Gibson USA', route: '/catalogo', queryParams: { brand: 'gibson' } },
    { label: 'Yamaha Music', route: '/catalogo', queryParams: { brand: 'yamaha' } },
    { label: 'Roland', route: '/catalogo', queryParams: { brand: 'roland' } },
    { label: 'Ibanez Guitars', route: '/catalogo', queryParams: { brand: 'ibanez' } },
    { label: 'Taylor Guitars', route: '/catalogo', queryParams: { brand: 'taylor' } },
    { label: 'Pioneer DJ', route: '/catalogo', queryParams: { brand: 'pioneer-dj' } },
    { label: 'Shure Microphones', route: '/catalogo', queryParams: { brand: 'shure' } },
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
