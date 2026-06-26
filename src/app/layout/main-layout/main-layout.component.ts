import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TestimonialsComponent } from '../../features/home/sections/testimonials/testimonials.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TestimonialsComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
