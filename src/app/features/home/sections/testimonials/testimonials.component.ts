import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';

interface Testimonial {
  type?: 'text' | 'image';
  text?: string;
  author?: string;
  city?: string;
  image?: string;
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
      text: 'Compré mi Fender Strat aquí, el mejor precio que encontré en toda Lima y la entrega fue súper rápida. Sin duda volveré a comprar.',
      author: 'Carlos Martinez',
      city: 'Lima, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727884816_2113209826237901_1589096319711134015_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=a339uMIND_oQ7kNvwGnAssP&_nc_oc=Adq2Vlwhs5p8CunAsYsBfTMgMTx23VqVLfODH7AF4eNRfz977MXlJaInNk8Zr1Lt0eE&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=57eIJTWoTBexwlvD-KZW9A&_nc_ss=7b2a8&oh=00_Af9pQXXA3kVY62uFyljDuNpMvb6AMm6v18kHDc4FKc3PwQ&oe=6A3D5BC3',
    },
    {
      text: 'Me asesoraron para elegir mi primer teclado y acertaron completamente en la recomendación. El envío a Arequipa llegó en menos de 48 horas.',
      author: 'Valeria Robles',
      city: 'Arequipa, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727602972_1739865884102640_4968615904578261494_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Fy2g74NU4pMQ7kNvwH8r6T0&_nc_oc=AdpiV6GvoaR4pmwJPPSkBFs0iQKWabYkXAM3kIi-YgCH0h7AJYfoA_7EIm8Ycy0cvJ0&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=JcvgFHmu-dZqXRaaUYm9Ug&_nc_ss=7b2a8&oh=00_Af94Rbfx_HhGpVFdbrTyuBjA0SYgVmRRtniG10OLpZy6_A&oe=6A3D7AB1',
    },
    {
      text: 'He comprado tres veces, cuerdas baquetas y pedal, todo llegó en perfecto estado. Buenos precios y el servicio siempre es bueno.',
      author: 'Miguel Ángeles',
      city: 'Trujillo, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727884816_2113209826237901_1589096319711134015_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=a339uMIND_oQ7kNvwGnAssP&_nc_oc=Adq2Vlwhs5p8CunAsYsBfTMgMTx23VqVLfODH7AF4eNRfz977MXlJaInNk8Zr1Lt0eE&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=57eIJTWoTBexwlvD-KZW9A&_nc_ss=7b2a8&oh=00_Af9pQXXA3kVY62uFyljDuNpMvb6AMm6v18kHDc4FKc3PwQ&oe=6A3D5BC3',
    },
    {
      text: 'Compré una batería electrónica Roland, me dieron el mejor precio del mercado y además me la instalaron sin costo adicional. El servicio postventa es excepcional.',
      author: 'Andrea Guzmán',
      city: 'Lima, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727602972_1739865884102640_4968615904578261494_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Fy2g74NU4pMQ7kNvwH8r6T0&_nc_oc=AdpiV6GvoaR4pmwJPPSkBFs0iQKWabYkXAM3kIi-YgCH0h7AJYfoA_7EIm8Ycy0cvJ0&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=JcvgFHmu-dZqXRaaUYm9Ug&_nc_ss=7b2a8&oh=00_Af94Rbfx_HhGpVFdbrTyuBjA0SYgVmRRtniG10OLpZy6_A&oe=6A3D7AB1',
    },
    {
      text: 'El Shure SM58 llegó al día siguiente perfectamente sellado y con garantía. Lo había visto en otras tiendas pero aquí conseguí mejor precio.',
      author: 'Diego Piccaso',
      city: 'Cusco, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727884816_2113209826237901_1589096319711134015_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=a339uMIND_oQ7kNvwGnAssP&_nc_oc=Adq2Vlwhs5p8CunAsYsBfTMgMTx23VqVLfODH7AF4eNRfz977MXlJaInNk8Zr1Lt0eE&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=57eIJTWoTBexwlvD-KZW9A&_nc_ss=7b2a8&oh=00_Af9pQXXA3kVY62uFyljDuNpMvb6AMm6v18kHDc4FKc3PwQ&oe=6A3D5BC3',
    },
    {
      text: 'Compro seguido cuerdas y accesorios aquí, siempre hay variedad y buenos precios. El local es cómodo y la atención rápida sin vueltas.',
      author: 'Sofía Luna',
      city: 'Lima, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727602972_1739865884102640_4968615904578261494_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Fy2g74NU4pMQ7kNvwH8r6T0&_nc_oc=AdpiV6GvoaR4pmwJPPSkBFs0iQKWabYkXAM3kIi-YgCH0h7AJYfoA_7EIm8Ycy0cvJ0&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=JcvgFHmu-dZqXRaaUYm9Ug&_nc_ss=7b2a8&oh=00_Af94Rbfx_HhGpVFdbrTyuBjA0SYgVmRRtniG10OLpZy6_A&oe=6A3D7AB1',
    },
    {
      text: 'La asesoría fue clave para elegir mi interface Focusrite. El vendedor sabía lo que recomendaba y me explicó todo sin hacerme sentir perdido.',
      author: 'Renato Ferreyra',
      city: 'Chiclayo, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727884816_2113209826237901_1589096319711134015_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=a339uMIND_oQ7kNvwGnAssP&_nc_oc=Adq2Vlwhs5p8CunAsYsBfTMgMTx23VqVLfODH7AF4eNRfz977MXlJaInNk8Zr1Lt0eE&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=57eIJTWoTBexwlvD-KZW9A&_nc_ss=7b2a8&oh=00_Af9pQXXA3kVY62uFyljDuNpMvb6AMm6v18kHDc4FKc3PwQ&oe=6A3D5BC3',
    },
    {
      text: 'Mi primera compra online en Jackson y todo salió bien. El soporte por WhatsApp responde rápido y la página es fácil de usar.',
      author: 'Camila Valdivia',
      city: 'Huancayo, Perú',
    },
    {
      type: 'image',
      image:
        'https://scontent.flim18-1.fna.fbcdn.net/v/t39.99422-6/727602972_1739865884102640_4968615904578261494_n.png?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Fy2g74NU4pMQ7kNvwH8r6T0&_nc_oc=AdpiV6GvoaR4pmwJPPSkBFs0iQKWabYkXAM3kIi-YgCH0h7AJYfoA_7EIm8Ycy0cvJ0&_nc_zt=14&_nc_ht=scontent.flim18-1.fna&_nc_gid=JcvgFHmu-dZqXRaaUYm9Ug&_nc_ss=7b2a8&oh=00_Af94Rbfx_HhGpVFdbrTyuBjA0SYgVmRRtniG10OLpZy6_A&oe=6A3D7AB1',
    },
  ];
}
