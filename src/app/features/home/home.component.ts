import { Component } from '@angular/core';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { CategoryGridComponent } from './sections/category-grid/category-grid.component';
import { NewArrivalsComponent } from './sections/new-arrivals/new-arrivals.component';
import { BestsellersComponent } from './sections/bestsellers/bestsellers.component';
import { BrandStripComponent } from './sections/brand-strip/brand-strip.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { WhyJacksonComponent } from './sections/why-jackson/why-jackson.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    CategoryGridComponent,
    NewArrivalsComponent,
    BestsellersComponent,
    BrandStripComponent,
    TestimonialsComponent,
    WhyJacksonComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
