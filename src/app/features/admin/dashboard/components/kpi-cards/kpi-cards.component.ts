import { Component, inject, computed, PLATFORM_ID } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, of, map, catchError, startWith } from 'rxjs';
import type { Observable } from 'rxjs';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { DashboardRangeService } from '../../../../../core/services/dashboard-range.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { IconComponent } from '../../../../../shared/icons/icon.component';
import type { DashboardSummary, LoadState } from '../../../../../core/models';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [DecimalPipe, SpinnerComponent, IconComponent],
  templateUrl: './kpi-cards.component.html',
  host: { class: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-5' },
})
export class KpiCardsComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly service = inject(DashboardService);
  private readonly rangeService = inject(DashboardRangeService);

  private state$ = isPlatformBrowser(this.platformId)
    ? toObservable(this.rangeService.range).pipe(
        switchMap(() =>
          this.service.getSummary(this.rangeService.range()).pipe(
            map((data): LoadState<DashboardSummary> => ({ loading: false, data, error: null })),
            catchError((err): Observable<LoadState<DashboardSummary>> => {
              console.error('Error al cargar el resumen:', err);
              return of({ loading: false, data: null, error: 'Error al cargar el resumen' });
            }),
            startWith<LoadState<DashboardSummary>>({ loading: true, data: null, error: null }),
          ),
        ),
      )
    : of<LoadState<DashboardSummary>>({ loading: true, data: null, error: null });
  private readonly state = toSignal(this.state$, {
    initialValue: { loading: true, data: null, error: null } as LoadState<DashboardSummary>,
  });

  readonly data = computed(() => this.state().data);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  formatCurrency(value: number): string {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}
