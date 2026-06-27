import {
  Component,
  computed,
  inject,
  effect,
  ViewChild,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CurrencyPipe } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, map, catchError, startWith } from 'rxjs';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { DashboardRangeService } from '../../../../../core/services/dashboard-range.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import type { SalesByPeriodEntry, LoadState } from '../../../../../core/models';
import type { Chart } from 'chart.js';
import { renderSalesChart } from './sales-chart.config';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [SpinnerComponent, CurrencyPipe],
  templateUrl: './sales-chart.component.html',
})
export class SalesChartComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);
  private readonly rangeService = inject(DashboardRangeService);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private readonly state = toSignal(
    toObservable(this.rangeService.range).pipe(
      switchMap((range) => {
        if (!this.isBrowser) {
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

  readonly totalSales = computed(() =>
    (this.data() ?? []).reduce((sum, e) => sum + e.totalSales, 0),
  );

  @ViewChild('salesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      const d = this.data();
      if (this.isBrowser && d && d.length > 0) {
        setTimeout(() => {
          if (this.canvasRef?.nativeElement) {
            this.chart?.destroy();
            this.chart = renderSalesChart(this.canvasRef.nativeElement, d);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
