import {
  Component,
  inject,
  input,
  computed,
  effect,
  output,
  ViewChild,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, map, catchError, startWith } from 'rxjs';
import type { Observable } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { DASHBOARD_ORDER_STATUS_MAP } from '../../dashboard.types';
import { Chart, registerables } from 'chart.js';
import type { OrdersByStatusEntry, DashboardOrderStatus, DateRange, LoadState } from '../../dashboard.types';

Chart.register(...registerables);

const CHART_COLORS: Record<string, string> = {
  PENDING: '#F59E0B',
  PAID: '#3B82F6',
  SHIPPED: '#8B5CF6',
  DELIVERED: '#10B981',
  CANCELLED: '#EF4444',
};

@Component({
  selector: 'app-orders-by-status',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [SpinnerComponent],
  templateUrl: './orders-by-status.component.html',
})
export class OrdersByStatusComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  readonly range = input<DateRange>({ desde: '', hasta: '' });
  readonly statusClick = output<DashboardOrderStatus>();

  private state$ = toObservable(this.range).pipe(
    switchMap(() => this.service.getOrdersByStatus(this.range()).pipe(
      map((data): LoadState<OrdersByStatusEntry[]> => ({ loading: false, data, error: null })),
      catchError((): Observable<LoadState<OrdersByStatusEntry[]>> =>
        of({ loading: false, data: null, error: 'Error al cargar estados' }),
      ),
      startWith<LoadState<OrdersByStatusEntry[]>>({ loading: true, data: null, error: null }),
    )),
  );
  private readonly state = toSignal(this.state$, { initialValue: { loading: true, data: null, error: null } as LoadState<OrdersByStatusEntry[]> });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  @ViewChild('statusCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      const d = this.data();
      if (this.isBrowser && d && d.length > 0 && this.canvasRef?.nativeElement) {
        this.render();
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

  private render() {
    this.chart?.destroy();

    const data = this.data();
    if (!data) return;

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = data.map((e) => CHART_COLORS[e.status] || '#9ca3af');
    const labels = data.map((e) => DASHBOARD_ORDER_STATUS_MAP[e.status]?.label || e.status);

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: data.map((e) => e.count),
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        radius: '65%',
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#111827',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw} órdenes`,
            },
          },
        },
        onClick: (_event, elements) => {
          if (elements.length > 0) {
            const idx = elements[0].index;
            this.statusClick.emit(data[idx].status);
          }
        },
      },
    });
  }

  colorFor(status: string): string {
    return CHART_COLORS[status] || '#9ca3af';
  }

  labelFor(status: string): string {
    return DASHBOARD_ORDER_STATUS_MAP[status as DashboardOrderStatus]?.label || status;
  }
}
