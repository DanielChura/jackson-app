import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BrandService } from '../../../../core/services/brand.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './brand-form.component.html',
})
export class BrandFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly brandService = inject(BrandService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly brandId = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    logoUrl: [''],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.brandId.set(id);
      this.loadBrand(id);
    }
  }

  private loadBrand(id: string) {
    this.loading.set(true);
    this.brandService.getById(id).subscribe({
      next: (brand) => {
        this.form.patchValue(brand);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.saving.set(true);
    const payload = this.form.getRawValue();

    const request = this.isEdit()
      ? this.brandService.update(this.brandId()!, payload)
      : this.brandService.create(payload);

    request.subscribe({
      next: () => {
        this.toast.show(this.isEdit() ? 'Marca actualizada' : 'Marca creada');
        this.router.navigate(['/admin/brands']);
      },
      error: (err) => {
        this.errorService.show(err.error);
        this.saving.set(false);
      },
    });
  }
}
