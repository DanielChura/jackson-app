import { Component, inject, computed, PLATFORM_ID } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, map, catchError, startWith } from 'rxjs';
import type { Observable } from 'rxjs';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import type { RecentOrderEntry, LoadState } from '../../../../../core/models';
import { DASHBOARD_ORDER_STATUS_MAP } from '../../../../../core/models';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [DatePipe, SpinnerComponent],
  templateUrl: './recent-orders.component.html',
})
export class RecentOrdersComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);

  private state$ = (isPlatformBrowser(this.platformId)
    ? this.service.getRecentOrders().pipe(
        map((data): LoadState<RecentOrderEntry[]> => ({ loading: false, data, error: null })),
        catchError(
          (err): Observable<LoadState<RecentOrderEntry[]>> => {
            console.error('Error al cargar órdenes recientes:', err);
            return of({ loading: false, data: null, error: 'Error al cargar órdenes recientes' });
          },
        ),
        startWith<LoadState<RecentOrderEntry[]>>({ loading: true, data: null, error: null }),
      )
    : of<LoadState<RecentOrderEntry[]>>({ loading: true, data: null, error: null })
  );

  private readonly state = toSignal(this.state$, {
    initialValue: { loading: true, data: null, error: null } as LoadState<RecentOrderEntry[]>,
  });

  readonly orders = computed(() => this.state().data ?? []);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  formatCurrency(value: number): string {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  statusInfo(status: string) {
    return DASHBOARD_ORDER_STATUS_MAP[status as keyof typeof DASHBOARD_ORDER_STATUS_MAP];
  }
}
