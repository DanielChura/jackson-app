import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { BrandService } from '../../../../core/services/brand.service';
import { CreateProductRequest, CategoryResponse, BrandResponse } from '../../../../core/models';

import { StepIndicatorComponent } from '../../../../shared/components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, StepIndicatorComponent],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isEdit = signal(false);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly categories = signal<CategoryResponse[]>([]);
  readonly brands = signal<BrandResponse[]>([]);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
    brandId: ['', Validators.required],
  });

  constructor() {
    this.categoryService.getAll(0, 100).subscribe({
      next: (res) => this.categories.set(res.content),
    });
    this.brandService.getAll(0, 100).subscribe({
      next: (res) => this.brands.set(res.content),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.loadProduct(id);
    }
  }

  private loadProduct(id: string) {
    this.loading.set(true);
    this.productService.getById(id).subscribe({
      next: (p) => {
        this.form.patchValue({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          categoryId: p.category?.id ?? '',
          brandId: p.brand?.id ?? '',
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.saving.set(true);

    const raw = this.form.getRawValue();
    const payload: CreateProductRequest = {
      name: raw.name,
      description: raw.description,
      price: raw.price,
      stock: raw.stock,
      categoryId: raw.categoryId,
      brandId: raw.brandId,
    };

    const obs$ = this.isEdit()
      ? this.productService.update(this.route.snapshot.paramMap.get('id')!, payload)
      : this.productService.create(payload);

    obs$.subscribe({
      next: (product) => {
        if (this.isEdit()) {
          this.router.navigate(['/admin/products', this.route.snapshot.paramMap.get('id')!, 'edit', 'images']);
        } else {
          this.router.navigate(['/admin/products/new/images', product.id]);
        }
      },
      error: () => this.saving.set(false),
    });
  }
}
