import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { StepIndicatorComponent } from '../../../../shared/components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-spec-step',
  standalone: true,
  imports: [ReactiveFormsModule, StepIndicatorComponent],
  templateUrl: './spec-step.component.html',
})
export class SpecStepComponent {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly productId = this.route.snapshot.paramMap.get('id')!;
  readonly saving = signal(false);

  readonly form = this.fb.nonNullable.group({
    bullets: this.fb.array([
      this.createBullet(),
      this.createBullet(),
      this.createBullet(),
      this.createBullet(),
      this.createBullet(),
    ]),
  });

  get bullets() {
    return this.form.controls.bullets;
  }

  private createBullet() {
    return this.fb.nonNullable.group({
      label: [''],
      value: [''],
    });
  }

  submit() {
    const bullets = this.form.getRawValue().bullets.filter((b) => b.label.trim() || b.value.trim());
    if (bullets.length === 0) {
      this.router.navigate(['/admin/products']);
      return;
    }
    this.saving.set(true);
    this.productService.updateSpecifications(this.productId, { bullets }).subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: () => this.saving.set(false),
    });
  }

  skip() {
    this.router.navigate(['/admin/products']);
  }
}
