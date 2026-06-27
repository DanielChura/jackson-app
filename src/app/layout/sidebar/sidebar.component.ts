import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from '../../shared/icons/icon.component';

interface NavMenu {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  protected readonly auth = inject(AuthService);

  protected readonly navItems: NavMenu[] = [
    { label: 'Dashboard', path: '/admin', icon: 'layout-dashboard' },
    { label: 'Productos', path: '/admin/products', icon: 'package' },
    { label: 'Marcas', path: '/admin/brands', icon: 'tag' },
    { label: 'Categorías', path: '/admin/categories', icon: 'grid' },
    { label: 'Órdenes', path: '/admin/orders', icon: 'shopping-cart-share' },
    { label: 'Usuarios', path: '/admin/users', icon: 'users' },
    { label: 'Inventario', path: '/admin/inventory', icon: 'clipboard-list' },
  ];
}
