import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BrandLogo {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-brand-stripe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-stripe.component.html',
})
export class BrandStripeComponent {
  brandLogos: BrandLogo[] = [
    { src: '/logos/jackson.png', alt: 'Jackson' },
    { src: '/logos/ibanez.png', alt: 'Ibanez' },
    { src: '/logos/gibson.png', alt: 'Gibson' },
    { src: '/logos/focusrite.png', alt: 'Focusrite' },
    { src: '/logos/fender.png', alt: 'Fender' },
    { src: '/logos/esp.png', alt: 'ESP' },
    { src: '/logos/ernie-ball.png', alt: 'Ernie Ball' },
    { src: '/logos/epiphone.png', alt: 'Epiphone' },
    { src: '/logos/casio.png', alt: 'Casio' },
    { src: '/logos/jackson.png', alt: 'Jackson' },
    { src: '/logos/ibanez.png', alt: 'Ibanez' },
    { src: '/logos/gibson.png', alt: 'Gibson' },
    { src: '/logos/focusrite.png', alt: 'Focusrite' },
    { src: '/logos/fender.png', alt: 'Fender' },
    { src: '/logos/esp.png', alt: 'ESP' },
    { src: '/logos/ernie-ball.png', alt: 'Ernie Ball' },
    { src: '/logos/epiphone.png', alt: 'Epiphone' },
    { src: '/logos/casio.png', alt: 'Casio' },
  ];
}
