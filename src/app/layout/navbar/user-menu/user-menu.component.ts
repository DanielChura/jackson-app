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
  private closeTimer: any;

  readonly navigate = output<void>();

  open() {
    clearTimeout(this.closeTimer);
    this.userDropdownOpen.set(true);
  }

  closeDelayed() {
    this.closeTimer = setTimeout(() => {
      this.userDropdownOpen.set(false);
    }, 200);
  }

  toggle() {
    clearTimeout(this.closeTimer);
    this.userDropdownOpen.update((v) => !v);
  }

  close() {
    clearTimeout(this.closeTimer);
    this.userDropdownOpen.set(false);
    this.navigate.emit();
  }
}
