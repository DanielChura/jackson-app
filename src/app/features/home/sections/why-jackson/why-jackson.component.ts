import { Component, signal } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { IconName } from '../../../../shared/icons/icons';

interface ValueProp {
  icon: IconName;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

@Component({
  selector: 'app-why-jackson',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './why-jackson.component.html',
})
export class WhyJacksonComponent {
  protected readonly selectedIndex = signal(0);

  protected readonly props: ValueProp[] = [
    {
      icon: 'guitar',
      title: '+2000 instrumentos en stock',
      description:
        'Desde tu primera guitarra hasta equipo profesional. Más de 2000 opciones listas para ti.',
      image:
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Variedad de guitarras en tienda de instrumentos musicales',
    },
    {
      icon: 'truck',
      title: 'Envío a todo Perú',
      description:
        'Lima en 24 horas, provincia en 48-72. Envío seguro con seguimiento en tiempo real.',
      image:
        'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Paquete para envío a domicilio',
    },
    {
      icon: 'tool',
      title: 'Garantía y service propio',
      description:
        'Hasta 3 años en productos seleccionados. Taller propio en Lima con técnicos especializados.',
      image:
        'https://images.unsplash.com/photo-1601748323111-7e094af21010?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Técnico reparando equipo musical en taller especializado',
    },
    {
      icon: 'mic',
      title: 'Asesoría de músicos',
      description:
        'Todos tocamos. Te ayudamos a elegir el equipo correcto para tu nivel, género y presupuesto.',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format',
      imageAlt: 'Asesor atendiendo a cliente en tienda de instrumentos musicales',
    },
  ];

  protected selectProp(index: number): void {
    this.selectedIndex.set(index);
  }
}
