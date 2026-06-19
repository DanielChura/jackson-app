import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InventoryService } from '../../../../core/services/inventory.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ErrorService } from '../../../../core/services/error.service';
import { MovementType } from '../../../../core/models';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inventory-form.component.html',
})
export class InventoryFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly inventoryService = inject(InventoryService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly errorService = inject(ErrorService);

  readonly loading = signal(false);

  readonly movementTypes: { value: MovementType; label: string }[] = [
    { value: 'IN', label: 'Entrada (IN)' },
    { value: 'OUT', label: 'Salida (OUT)' },
    { value: 'ADJUSTMENT', label: 'Ajuste (ADJUSTMENT)' },
  ];

  readonly form = this.fb.nonNullable.group({
    productId: ['', Validators.required],
    movementType: ['IN' as MovementType, Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
    reason: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.inventoryService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.toast.show('Movimiento registrado');
        this.router.navigate(['/admin/inventory']);
      },
      error: (err) => {
        this.errorService.show(err.error);
        this.loading.set(false);
      },
    });
  }
}
