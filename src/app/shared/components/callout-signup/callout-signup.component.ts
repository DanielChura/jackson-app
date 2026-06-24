import { Component, input } from '@angular/core';
import { IconComponent } from '../../icons/icon.component';

export interface CalloutConfig {
  headline: string;
  subcopy: string;
  ctaLabel: string;
  finePrint?: string;
  imageUrl?: string;
  variant?: 'discount' | 'waitlist' | 'event' | 'newsletter';
}

@Component({
  selector: 'app-callout-signup',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './callout-signup.component.html',
})
export class CalloutSignupComponent {
  config = input<CalloutConfig>({
    headline: 'Tu música merece el mejor equipo. 10% OFF al suscribirte',
    subcopy:
      'Sé el primero en recibir lanzamientos exclusivos, invitaciones a eventos privados y sesiones de prueba. Todo para potenciar tu talento.',
    ctaLabel: 'Quiero mi 10% OFF',
    finePrint: 'Sin spam. Solo contenido que impulsa tu música.',
    imageUrl: '/images/footer-gibson-custom.png',
    variant: 'discount',
  });
}
