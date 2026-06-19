import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { ProductImageResponse } from '../../../../core/models';

import { StepIndicatorComponent } from '../../../../shared/components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [RouterLink, StepIndicatorComponent],
  templateUrl: './image-upload.component.html',
})
export class ImageUploadComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly productId = this.route.snapshot.paramMap.get('id')!;
  readonly isEdit = !this.route.snapshot.url[0]?.path.includes('new');
  readonly saving = signal(false);
  readonly existingImages = signal<ProductImageResponse[]>([]);
  readonly slotFiles = signal<(File | null)[]>(Array(10).fill(null));
  private readonly objectUrls = new Map<number, string>();

  constructor() {
    this.productService.getImages(this.productId).subscribe({
      next: (images) => this.existingImages.set(images),
    });
  }

  onFileSelected(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    if (!file) return;
    const slots = [...this.slotFiles()];
    slots[index] = file;
    this.slotFiles.set(slots);
  }

  getObjectUrl(index: number, file: File): string {
    if (this.objectUrls.has(index)) {
      URL.revokeObjectURL(this.objectUrls.get(index)!);
    }
    const url = URL.createObjectURL(file);
    this.objectUrls.set(index, url);
    return url;
  }

  removeSlotFile(index: number) {
    if (this.objectUrls.has(index)) {
      URL.revokeObjectURL(this.objectUrls.get(index)!);
      this.objectUrls.delete(index);
    }
    const slots = [...this.slotFiles()];
    slots[index] = null;
    this.slotFiles.set(slots);
  }

  deleteExistingImage(imageId: string) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    this.productService.deleteImage(this.productId, imageId).subscribe({
      next: () => {
        this.existingImages.set(this.existingImages().filter((img) => img.id !== imageId));
      },
    });
  }

  private specsRoute(): string[] {
    return this.isEdit
      ? ['/admin/products', this.productId, 'edit', 'specs']
      : ['/admin/products/new/specs', this.productId];
  }

  submit() {
    const files = this.slotFiles().filter((f): f is File => f !== null);
    if (files.length === 0) {
      this.router.navigate(this.specsRoute());
      return;
    }
    this.saving.set(true);
    this.productService.uploadImages(this.productId, files).subscribe({
      next: () => this.router.navigate(this.specsRoute()),
      error: () => this.saving.set(false),
    });
  }

  skip() {
    this.router.navigate(this.specsRoute());
  }
}
