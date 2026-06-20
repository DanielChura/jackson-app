import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';

interface TrustItem {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './trust-bar.component.html',
})
export class TrustBarComponent {
  protected readonly trustItems: TrustItem[] = [
    { icon: 'shield-check', label: 'Pago seguro' },
    { icon: 'refresh-cw', label: 'Devolución fácil' },
    { icon: 'headphones', label: 'Soporte 24/7' },
  ];
}
