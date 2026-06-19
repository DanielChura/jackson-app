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
import type { TopProductEntry, DateRange, LoadState } from '../../dashboard.types';

Chart.register(...registerables);

@Component({
  selector: 'app-top-products',
  standalone: true,
  host: { class: 'block h-full' },
  imports: [SpinnerComponent],
  templateUrl: './top-products.component.html',
})
export class TopProductsComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  readonly range = input<DateRange>({ desde: '', hasta: '' });

  private state$ = toObservable(this.range).pipe(
    switchMap(() => this.service.getTopProducts(10, this.range()).pipe(
      map((data): LoadState<TopProductEntry[]> => ({ loading: false, data, error: null })),
      catchError((): Observable<LoadState<TopProductEntry[]>> =>
        of({ loading: false, data: null, error: 'Error al cargar productos' }),
      ),
      startWith<LoadState<TopProductEntry[]>>({ loading: true, data: null, error: null }),
    )),
  );
  private readonly state = toSignal(this.state$, { initialValue: { loading: true, data: null, error: null } as LoadState<TopProductEntry[]> });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  @ViewChild('topCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

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

    const sorted = [...data].reverse();
    const labels = sorted.map((p) => p.productName);
    const values = sorted.map((p) => p.revenue);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Ingresos (S/)',
            data: values,
            backgroundColor: '#f97316',
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            callbacks: {
              title: (items) => labels[items[0].dataIndex],
              label: (ctx) => `S/ ${Number(ctx.raw).toLocaleString('es-PE')}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#6b7280',
              font: { size: 11 },
              callback: (_value: unknown, index: number) => {
                const label = labels[index];
                return label.length > 12 ? label.substring(0, 11) + '…' : label;
              },
            },
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
