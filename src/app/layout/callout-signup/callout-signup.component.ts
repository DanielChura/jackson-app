import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../shared/icons/icon.component';

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
  imports: [FormsModule, IconComponent],
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

  submitted = output<string>();

  email = '';
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';

  onSubmit() {
    if (!this.email || this.status === 'loading') return;
    this.status = 'loading';
    this.errorMessage = '';
    this.submitted.emit(this.email);
    setTimeout(() => {
      this.status = 'success';
    }, 1500);
  }
}
