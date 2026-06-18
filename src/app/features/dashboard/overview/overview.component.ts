import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  protected readonly auth = inject(AuthService);
}
