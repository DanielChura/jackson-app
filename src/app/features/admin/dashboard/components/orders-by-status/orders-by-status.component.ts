import {
  Component,
  inject,
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
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { DashboardRangeService } from '../../../../../core/services/dashboard-range.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import type { OrdersByStatusEntry, LoadState } from '../../../../../core/models';
import type { Chart } from 'chart.js';
import { renderOrdersByStatusChart, colorFor, labelFor } from './orders-by-status.config';

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
  private readonly rangeService = inject(DashboardRangeService);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  readonly colorFor = colorFor;
  readonly labelFor = labelFor;

  private state$ = this.isBrowser
    ? toObservable(this.rangeService.range).pipe(
        switchMap(() =>
          this.service.getOrdersByStatus(this.rangeService.range()).pipe(
            map(
              (data): LoadState<OrdersByStatusEntry[]> => ({ loading: false, data, error: null }),
            ),
            catchError((err): Observable<LoadState<OrdersByStatusEntry[]>> => {
              console.error('Error al cargar estados:', err);
              return of({ loading: false, data: null, error: 'Error al cargar estados' });
            }),
            startWith<LoadState<OrdersByStatusEntry[]>>({ loading: true, data: null, error: null }),
          ),
        ),
      )
    : of<LoadState<OrdersByStatusEntry[]>>({ loading: true, data: null, error: null });
  private readonly state = toSignal(this.state$, {
    initialValue: { loading: true, data: null, error: null } as LoadState<OrdersByStatusEntry[]>,
  });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  @ViewChild('statusCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      const d = this.data();
      if (this.isBrowser && d && d.length > 0) {
        setTimeout(() => {
          if (this.canvasRef?.nativeElement) {
            this.chart?.destroy();
            this.chart = renderOrdersByStatusChart(this.canvasRef.nativeElement, d);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
