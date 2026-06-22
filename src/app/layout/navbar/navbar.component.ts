import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/icons/icon.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CategoryNavComponent } from './category-nav/category-nav.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, IconComponent, UserMenuComponent, CategoryNavComponent],
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

  // Señales reactivas de estado de la interfaz
  protected readonly cartCount = signal(3); // Seteado para validar visualmente la UI del indicador naranja
  protected readonly mobileMenuOpen = signal(false);
  protected readonly megamenuOpen = signal(false);

  // Enlaces de categorías principales del e-commerce
  readonly categoryLinks = [
    { label: 'Guitarras', path: '/products?category=guitarras' },
    { label: 'Baterías', path: '/products?category=baterias' },
    { label: 'Teclados', path: '/products?category=teclados' },
    { label: 'Audio y micrófonos', path: '/products?category=audio-microfonos' },
    { label: 'Equipos de DJ', path: '/products?category=equipos-dj' },
    { label: 'Accesorios', path: '/products?category=accesorios' },
  ];

  toggleMobileMenu(): void {
    // Si abrimos el menú móvil, nos aseguramos de que el megamenú se cierre
    if (!this.mobileMenuOpen()) {
      this.megamenuOpen.set(false);
    }
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleMegamenu(): void {
    // Si abrimos el megamenú de escritorio, nos aseguramos de que el menú móvil se cierre
    if (!this.megamenuOpen()) {
      this.mobileMenuOpen.set(false);
    }
    this.megamenuOpen.update((v) => !v);
  }

  closeMegamenu(): void {
    this.megamenuOpen.set(false);
  }
}
