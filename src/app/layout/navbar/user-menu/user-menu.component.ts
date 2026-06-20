import { Component, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/icons/icon.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
  protected readonly auth = inject(AuthService);
  protected readonly userDropdownOpen = signal(false);

  readonly navigate = output<void>();

  toggle() {
    this.userDropdownOpen.update(v => !v);
  }

  close() {
    this.userDropdownOpen.set(false);
    this.navigate.emit();
  }
}
