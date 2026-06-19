import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CategoryService } from '../../../../core/services/category.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ErrorService } from '../../../../core/services/error.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly categoryId = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    imageUrl: [''],
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.categoryId.set(id);
      this.loadCategory(id);
    }
  }

  private loadCategory(id: string) {
    this.loading.set(true);
    this.categoryService.getById(id).subscribe({
      next: (cat) => {
        this.form.patchValue(cat);
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
      ? this.categoryService.update(this.categoryId()!, payload)
      : this.categoryService.create(payload);

    request.subscribe({
      next: () => {
        this.toast.show(this.isEdit() ? 'Categoría actualizada' : 'Categoría creada');
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        this.errorService.show(err.error);
        this.saving.set(false);
      },
    });
  }
}
