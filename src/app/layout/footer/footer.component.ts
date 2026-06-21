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
  protected readonly categories: FooterLink[] = [
    { label: 'Guitarras', route: '/products', queryParams: { category: 'guitarras' } },
    { label: 'Baterías', route: '/products', queryParams: { category: 'baterias' } },
    { label: 'Teclados', route: '/products', queryParams: { category: 'teclados' } },
    { label: 'Audio', route: '/products', queryParams: { category: 'audio-microfonos' } },
    { label: 'DJ', route: '/products', queryParams: { category: 'equipos-dj' } },
    { label: 'Accesorios', route: '/products', queryParams: { category: 'accesorios' } },
  ];

  protected readonly brands: FooterLink[] = [
    { label: 'Fender', route: '/products', queryParams: { brand: 'fender' } },
    { label: 'Gibson', route: '/products', queryParams: { brand: 'gibson' } },
    { label: 'Yamaha', route: '/products', queryParams: { brand: 'yamaha' } },
    { label: 'Roland', route: '/products', queryParams: { brand: 'roland' } },
    { label: 'Marshall', route: '/products', queryParams: { brand: 'marshall' } },
    { label: 'Shure', route: '/products', queryParams: { brand: 'shure' } },
  ];

  protected readonly legalLinks: FooterLink[] = [
    { label: 'Términos y condiciones', route: '/' },
    { label: 'Política de privacidad', route: '/' },
    { label: 'Libro de Reclamaciones', route: '/' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/jacksonmusic' },
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/jacksonmusic' },
    { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/@jacksonmusic' },
    { name: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com/@jacksonmusic' },
    { name: 'WhatsApp', icon: 'whatsapp', url: 'https://wa.me/51999999999' },
  ];

  protected readonly contactInfo: { label: string; href?: string; icon: string }[] = [
    { label: 'ventas@jacksonmusic.pe', href: 'mailto:ventas@jacksonmusic.pe', icon: 'mail' },
    { label: '(01) 555-1234', href: 'tel:+5115551234', icon: 'phone' },
    { label: 'Escríbenos por WhatsApp', href: 'https://wa.me/51999999999', icon: 'whatsapp' },
    { label: 'Av. La Marina 1234, Lima', icon: 'map-pin' },
  ];
}
