import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';

interface Testimonial {
  rating: number;
  text: string;
  author: string;
  city: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent {
  protected readonly testimonials: Testimonial[] = [
    {
      rating: 5,
      text: 'Compré mi Fender Strat aquí — el precio fue el mejor que encontré en Lima. La entrega fue súper rápida.',
      author: 'Carlos M.',
      city: 'Lima',
    },
    {
      rating: 5,
      text: 'Excelente atención. Me asesoraron para elegir mi primer teclado y no pudieron haber acertado más.',
      author: 'Valeria R.',
      city: 'Arequipa',
    },
    {
      rating: 4,
      text: 'Los pedidos online llegan muy bien empacados. Ya he comprado 3 veces y todo perfecto.',
      author: 'Miguel Á.',
      city: 'Trujillo',
    },
    {
      rating: 5,
      text: 'Compré una batería electrónica y me la instalaron sin costo adicional. Servicio de primera.',
      author: 'Andrea G.',
      city: 'Lima',
    },
    {
      rating: 5,
      text: 'El micrófono Shure SM58 que compré llegó al día siguiente. Muy recomendados.',
      author: 'Diego P.',
      city: 'Cusco',
    },
    {
      rating: 4,
      text: 'Buenos precios en accesorios. Compro seguido cuerdas y baquetas aquí.',
      author: 'Sofía L.',
      city: 'Lima',
    },
    {
      rating: 5,
      text: 'La asesoría fue clave para elegir mi interface de audio. Saben lo que venden.',
      author: 'Renato F.',
      city: 'Chiclayo',
    },
    {
      rating: 4,
      text: 'Primera vez comprando online y todo salió bien. El soporte por WhatsApp responde rápido.',
      author: 'Camila V.',
      city: 'Huancayo',
    },
  ];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: -(container.clientWidth / 2), behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
  }

  protected starsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
