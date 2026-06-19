import { Component, inject, output, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, map, catchError, startWith } from 'rxjs';
import type { Observable } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { DASHBOARD_ORDER_STATUS_MAP } from '../../dashboard.types';
import type { RecentOrderEntry, DashboardOrderStatus, LoadState } from '../../dashboard.types';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [DatePipe, SpinnerComponent],
  templateUrl: './recent-orders.component.html',
})
export class RecentOrdersComponent {
  private readonly service = inject(DashboardService);

  readonly orderClick = output<string>();

  private state$ = this.service.getRecentOrders().pipe(
    map((data): LoadState<RecentOrderEntry[]> => ({ loading: false, data, error: null })),
    catchError(
      (): Observable<LoadState<RecentOrderEntry[]>> =>
        of({ loading: false, data: null, error: 'Error al cargar órdenes recientes' }),
    ),
    startWith<LoadState<RecentOrderEntry[]>>({ loading: true, data: null, error: null }),
  );

  private readonly state = toSignal(this.state$, { initialValue: { loading: true, data: null, error: null } as LoadState<RecentOrderEntry[]> });

  readonly orders = computed(() => this.state().data ?? []);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  formatCurrency(value: number): string {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  statusInfo(status: string) {
    return DASHBOARD_ORDER_STATUS_MAP[status as DashboardOrderStatus];
  }
}
