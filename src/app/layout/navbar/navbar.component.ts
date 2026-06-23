import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { IconComponent } from '../../shared/icons/icon.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

interface MegamenuLink {
  label: string;
  queryParams: Record<string, string>;
}

interface MegamenuColumn {
  title: string;
  links: MegamenuLink[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, IconComponent, UserMenuComponent],
  templateUrl: './navbar.component.html',
  styles: [
    `
      @keyframes marquee {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .animate-marquee {
        animation: marquee 50s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `,
  ],
})
export class NavbarComponent {
  protected readonly auth = inject(AuthService);
  private readonly cartService = inject(CartService);
  private closeMegamenuTimer: any;

  protected readonly cartCount = this.cartService.count;
  protected readonly mobileMenuOpen = signal(false);
  protected readonly megamenuOpen = signal(false);

  protected readonly quickLinks = [
    { label: 'Ofertas', path: '/offers' },
    { label: 'Novedades', path: '/new-arrivals' },
    { label: 'Marcas', path: '/brands' },
    { label: 'Outlet', path: '/outlet' },
  ];

  protected readonly categoryLinks = [
    { label: 'Guitarras', path: '/products?category=guitarras' },
    { label: 'Baterías', path: '/products?category=baterias' },
    { label: 'Teclados', path: '/products?category=teclados' },
    { label: 'Audio y micrófonos', path: '/products?category=audio-microfonos' },
    { label: 'Equipos de DJ', path: '/products?category=equipos-dj' },
    { label: 'Accesorios', path: '/products?category=accesorios' },
  ];

  protected readonly megamenuColumns: MegamenuColumn[] = [
    {
      title: 'Guitarras',
      links: [
        { label: 'Guitarras Eléctricas', queryParams: { category: 'guitarras-electricas' } },
        { label: 'Guitarras Electroacústicas', queryParams: { category: 'guitarras-acusticas' } },
        { label: 'Guitarras Clásicas', queryParams: { category: 'guitarras-clasicas' } },
        {
          label: 'Amplificadores de Guitarra',
          queryParams: { category: 'amplificadores-guitarra' },
        },
      ],
    },
    {
      title: 'Bajos & Baterías',
      links: [
        { label: 'Bajos Eléctricos', queryParams: { category: 'bajos-electricos' } },
        { label: 'Baterías Acústicas', queryParams: { category: 'baterias-acusticas' } },
        { label: 'Kits Electrónicos MIDI', queryParams: { category: 'baterias-electronicas' } },
        { label: 'Platillos y Cymbales', queryParams: { category: 'platillos' } },
      ],
    },
    {
      title: 'Grabación & Sonido',
      links: [
        { label: 'Micrófonos de Estudio', queryParams: { category: 'microfonos-estudio' } },
        { label: 'Interfaces de Audio', queryParams: { category: 'interfaces-audio' } },
        { label: 'Monitores de Estudio', queryParams: { category: 'monitores-estudio' } },
        { label: 'Audífonos Profesionales', queryParams: { category: 'audifonos-monitoreo' } },
      ],
    },
    {
      title: 'Accesorios & Efectos',
      links: [
        { label: 'Pedales y Procesadores', queryParams: { category: 'pedales-efectos' } },
        { label: 'Cables y Conectores', queryParams: { category: 'cables-conectores' } },
        { label: 'Estuches y Fundas', queryParams: { category: 'estuches-fundas' } },
        { label: 'Pastillas y Repuestos', queryParams: { category: 'pastillas-guitarra' } },
      ],
    },
  ];

  constructor() {
    const user = this.auth.currentUser();
    if (user?.email) {
      this.cartService.getMine().subscribe({
        next: (cart) => this.cartService.count.set(cart.items.length),
        error: () => this.cartService.count.set(0),
      });
    }
  }

  toggleMobileMenu(): void {
    if (!this.mobileMenuOpen()) {
      this.megamenuOpen.set(false);
    }
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openMegamenu(): void {
    clearTimeout(this.closeMegamenuTimer);
    this.megamenuOpen.set(true);
    this.mobileMenuOpen.set(false);
  }

  closeMegamenuDelayed(): void {
    this.closeMegamenuTimer = setTimeout(() => {
      this.megamenuOpen.set(false);
    }, 200);
  }

  toggleMegamenu(): void {
    clearTimeout(this.closeMegamenuTimer);
    if (!this.megamenuOpen()) {
      this.mobileMenuOpen.set(false);
    }
    this.megamenuOpen.update((v) => !v);
  }

  closeMegamenu(): void {
    clearTimeout(this.closeMegamenuTimer);
    this.megamenuOpen.set(false);
  }
}
