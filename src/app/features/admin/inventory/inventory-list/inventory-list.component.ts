import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { InventoryService } from '../../../../core/services/inventory.service';
import { InventoryResponse, MovementType } from '../../../../core/models';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [DatePipe, RouterLink, SpinnerComponent, PaginatorComponent],
  templateUrl: './inventory-list.component.html',
})
export class InventoryListComponent {
  private readonly inventoryService = inject(InventoryService);

  readonly movements = signal<InventoryResponse[]>([]);
  readonly loading = signal(false);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  readonly movementLabels: Record<MovementType, string> = {
    IN: 'Entrada',
    OUT: 'Salida',
    SALE: 'Venta',
    RETURN: 'Devolución',
    ADJUSTMENT: 'Ajuste',
  };

  readonly movementColors: Record<MovementType, string> = {
    IN: 'text-green-600 bg-green-50',
    OUT: 'text-red-600 bg-red-50',
    SALE: 'text-blue-600 bg-blue-50',
    RETURN: 'text-amber-600 bg-amber-50',
    ADJUSTMENT: 'text-purple-600 bg-purple-50',
  };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.inventoryService.getAll(this.page(), 20).subscribe({
      next: (res) => {
        this.movements.set(res.content);
        this.totalPages.set(res.totalPages);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  prev() {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.load();
    }
  }

  next() {
    if (this.page() < this.totalPages() - 1) {
      this.page.update((p) => p + 1);
      this.load();
    }
  }
}
