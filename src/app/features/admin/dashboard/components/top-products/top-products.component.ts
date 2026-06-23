import { Component, inject, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, map, catchError, startWith } from 'rxjs';
import type { Observable } from 'rxjs';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { DashboardRangeService } from '../../../../../core/services/dashboard-range.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import type { TopProductEntry, LoadState } from '../../../../../core/models';

@Component({
  selector: 'app-top-products',
  standalone: true,
  host: { class: 'block' },
  imports: [SpinnerComponent],
  templateUrl: './top-products.component.html',
})
export class TopProductsComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);
  private readonly rangeService = inject(DashboardRangeService);

  private readonly state$ = isPlatformBrowser(this.platformId)
    ? toObservable(this.rangeService.range).pipe(
        switchMap(() =>
          this.service.getTopProducts(10, this.rangeService.range()).pipe(
            map((data): LoadState<TopProductEntry[]> => ({ loading: false, data, error: null })),
            catchError((err): Observable<LoadState<TopProductEntry[]>> => {
              console.error('Error al cargar productos:', err);
              return of({ loading: false, data: null, error: 'Error al cargar productos' });
            }),
            startWith<LoadState<TopProductEntry[]>>({ loading: true, data: null, error: null }),
          ),
        ),
      )
    : of<LoadState<TopProductEntry[]>>({ loading: true, data: null, error: null });

  private readonly state = toSignal(this.state$, {
    initialValue: { loading: true, data: null, error: null } as LoadState<TopProductEntry[]>,
  });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  formatCurrency(value: number): string {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
