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
})
export class NavbarComponent {
  protected readonly auth = inject(AuthService);
  protected readonly cartCount = signal(0);
  protected readonly mobileMenuOpen = signal(false);

  readonly categoryLinks = [
    { label: 'Guitarras', path: '/products?category=guitarras' },
    { label: 'Baterías', path: '/products?category=baterias' },
    { label: 'Teclados', path: '/products?category=teclados' },
    { label: 'Audio y micrófonos', path: '/products?category=audio-microfonos' },
    { label: 'Equipos de DJ', path: '/products?category=equipos-dj' },
    { label: 'Accesorios', path: '/products?category=accesorios' },
  ];

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
