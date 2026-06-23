import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';

interface TrustItem {
  icon: string;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './trust-bar.component.html',
})
export class TrustBarComponent {
  protected readonly trustItems: TrustItem[] = [
    {
      icon: 'shield-check',
      label: 'Compra blindada',
      desc: 'Cifrado SSL de 256 bits. Tus datos nunca se almacenan.',
    },
    {
      icon: 'refresh-cw',
      label: '30 días de prueba real',
      desc: 'Si no te convence el equipo, lo recogemos sin costo.',
    },
    {
      icon: 'headphones',
      label: 'Músicos respondiendo',
      desc: 'Soporte real por WhatsApp, chat o en tienda física.',
    },
    {
      icon: 'truck',
      label: 'Entrega con mimo',
      desc: 'Delivery especializado. Tu instrumento viaja asegurado.',
    },
  ];
}
