import {
  Component,
  inject,
  input,
  computed,
  effect,
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
import { Chart, registerables } from 'chart.js';
import type { SalesByPeriodEntry, DateRange, LoadState } from '../../dashboard.types';

Chart.register(...registerables);

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [SpinnerComponent],
  templateUrl: './sales-chart.component.html',
})
export class SalesChartComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  readonly range = input<DateRange>({ desde: '', hasta: '' });

  private state$ = toObservable(this.range).pipe(
    switchMap(() => this.service.getSalesByPeriod('day', this.range()).pipe(
      map((data): LoadState<SalesByPeriodEntry[]> => ({ loading: false, data, error: null })),
      catchError((): Observable<LoadState<SalesByPeriodEntry[]>> =>
        of({ loading: false, data: null, error: 'Error al cargar ventas' }),
      ),
      startWith<LoadState<SalesByPeriodEntry[]>>({ loading: true, data: null, error: null }),
    )),
  );
  private readonly state = toSignal(this.state$, { initialValue: { loading: true, data: null, error: null } as LoadState<SalesByPeriodEntry[]> });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  @ViewChild('salesCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      const d = this.data();
      if (this.isBrowser && d && d.length > 0 && this.canvasRef?.nativeElement) {
        this.render(d);
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

  private render(data: SalesByPeriodEntry[]) {
    this.chart?.destroy();

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d) => {
          if (d.period.includes('W')) return d.period.replace('2026-W', 'W');
          if (d.period.length === 7) return d.period;
          const parts = d.period.split('-');
          return `${parts[2]}/${parts[1]}`;
        }),
        datasets: [
          {
            label: 'Ventas (S/)',
            data: data.map((d) => d.totalSales),
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.08)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#f97316',
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#111827',
            bodyColor: '#6b7280',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af', font: { size: 11 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: {
              color: '#9ca3af',
              font: { size: 11 },
              callback: (v) => `S/${Number(v).toLocaleString('es-PE')}`,
            },
          },
        },
      },
    });
  }
}
