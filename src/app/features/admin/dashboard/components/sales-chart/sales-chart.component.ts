import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DecimalPipe, CurrencyPipe } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, map, catchError, startWith } from 'rxjs';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { DashboardRangeService } from '../../../../../core/services/dashboard-range.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import type { SalesByPeriodEntry, LoadState } from '../../../../../core/models';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [SpinnerComponent, DecimalPipe, CurrencyPipe],
  templateUrl: './sales-chart.component.html',
})
export class SalesChartComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);
  private readonly rangeService = inject(DashboardRangeService);

  private readonly state = toSignal(
    toObservable(this.rangeService.range).pipe(
      switchMap((range) => {
        if (!isPlatformBrowser(this.platformId)) {
          return of({ loading: false, data: null, error: null });
        }

        return this.service.getSalesByPeriod(range).pipe(
          map((data): LoadState<SalesByPeriodEntry[]> => ({ loading: false, data, error: null })),
          catchError(() => of({ loading: false, data: null, error: 'Error al cargar ventas' })),
          startWith({ loading: true, data: null, error: null }),
        );
      }),
    ),
    { initialValue: { loading: true, data: null, error: null } },
  );

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
}
