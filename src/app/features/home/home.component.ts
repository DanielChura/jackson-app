import { Component } from '@angular/core';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { CategoryGridComponent } from './sections/category-grid/category-grid.component';
import { NewArrivalsComponent } from './sections/new-arrivals/new-arrivals.component';
import { BestsellersComponent } from './sections/bestsellers/bestsellers.component';
import { BrandStripComponent } from './sections/brand-strip/brand-strip.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { TrustBarComponent } from './sections/trust-bar/trust-bar.component';
import { AudienceSectionComponent } from './sections/audience-section/audience-section.component';
import { HotDealsComponent } from './sections/hot-deals/hot-deals.component';
import { FeaturedDualComponent } from './sections/featured-dual/featured-dual.component';
import { CalloutSignupComponent } from '../../layout/callout-signup/callout-signup.component';

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
    TrustBarComponent,
    AudienceSectionComponent,
    HotDealsComponent,
    FeaturedDualComponent,
    CalloutSignupComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
