import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/icons/icon.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CategoryNavComponent } from './category-nav/category-nav.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent, UserMenuComponent, CategoryNavComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected readonly auth = inject(AuthService);
  protected readonly cartCount = signal(0);
  protected readonly mobileMenuOpen = signal(false);

  readonly categoryLinks = [
    { label: 'Guitarras', path: '/c/guitarras' },
    { label: 'Pedales y amplificadores', path: '/c/pedales-amplificadores' },
    { label: 'Teclados y sintetizadores', path: '/c/teclados-sintetizadores' },
    { label: 'Equipo de grabación', path: '/c/equipo-grabacion' },
    { label: 'Baterías', path: '/c/baterias' },
    { label: 'Equipos de DJ y audio', path: '/c/equipos-dj-audio' },
    { label: 'Más categorías', path: '/c/mas-categorias' },
  ];

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
