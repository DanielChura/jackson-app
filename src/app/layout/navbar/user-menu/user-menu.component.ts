import { Component, inject } from '@angular/core';
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
}
